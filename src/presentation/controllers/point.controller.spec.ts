import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppConfigModule } from 'src/application/config/config.module';
import { GlobalResponse } from 'src/application/config/response/global-response';
import { ChargePointUseCase } from 'src/application/use-cases/point/charge-point.use-case';
import { GetPointUseCase } from 'src/application/use-cases/point/get-point.use-case';
import { UseCaseModule } from 'src/application/use-cases/use-case.module';
import { Point } from 'src/domain/entities/point.entity';
import * as timestampModule from 'src/domain/utils/dayjs.util';
import { PointController } from 'src/presentation/controllers/point.controller';
import { PointResponseDto } from 'src/presentation/dtos/point/point-response.dto';

describe('PointController', () => {
  let pointController: PointController;
  let getPointUseCase: GetPointUseCase;
  let chargePointUseCase: ChargePointUseCase;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppConfigModule, UseCaseModule],
      controllers: [PointController],
    }).compile();

    pointController = moduleRef.get(PointController);
    getPointUseCase = moduleRef.get(GetPointUseCase);
    chargePointUseCase = moduleRef.get(ChargePointUseCase);
  });

  const updatedAt = '2021-01-01 00:00:00.111';
  const isoString = '2021-01-01T00:00:00.111Z';
  jest.spyOn(timestampModule, 'getTimestamp').mockReturnValue(updatedAt);
  jest.spyOn(Date.prototype, 'toISOString').mockReturnValue(isoString);

  describe('GetPoint', () => {
    it('포인트가 정상으로 조회되었을 때', async () => {
      const useCaseResponse = new Point(1, 1, 100, updatedAt);
      jest
        .spyOn(getPointUseCase, 'execute')
        .mockResolvedValueOnce(useCaseResponse);

      const controllerResponse = GlobalResponse.success({
        statusCode: 200,
        message: '포인트 조회에 성공하였습니다.',
        data: new PointResponseDto(useCaseResponse),
      });

      const response = await pointController.get(1);

      expect(response).toEqual(controllerResponse);
      expect(response.data.point).toEqual(controllerResponse.data.point);
      expect(response.data.updatedAt).toEqual(
        controllerResponse.data.updatedAt,
      );
      expect(getPointUseCase.execute).toBeCalledWith({ userId: 1 });
    });

    it('포인트가 조회되지 않았을 때 (사용자 정보 오류)', async () => {
      jest
        .spyOn(getPointUseCase, 'execute')
        .mockRejectedValueOnce(
          new NotFoundException('사용자를 찾을 수 없습니다.'),
        );

      try {
        await pointController.get(1);
        fail('테스트 실패');
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe('사용자를 찾을 수 없습니다.');
        expect(getPointUseCase.execute).toBeCalledWith({ userId: 1 });
      }
    });

    it('포인트가 조회되지 않았을 때 (서버 오류)', async () => {
      jest
        .spyOn(getPointUseCase, 'execute')
        .mockRejectedValueOnce(new InternalServerErrorException());

      try {
        await pointController.get(1);
        fail('테스트 실패');
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
        expect(getPointUseCase.execute).toBeCalledWith({ userId: 1 });
      }
    });
  });

  describe('ChargePoint', () => {
    it('포인트가 정상으로 충전되었을 때', async () => {
      const useCaseResponse = new Point(1, 1, 100, updatedAt);
      jest
        .spyOn(chargePointUseCase, 'execute')
        .mockResolvedValueOnce(useCaseResponse);

      const controllerResponse = GlobalResponse.success({
        statusCode: 200,
        message: '포인트 충전에 성공하였습니다.',
        data: new PointResponseDto(useCaseResponse),
      });

      const response = await pointController.charge({
        userId: 1,
        point: 100,
      });

      expect(response).toEqual(controllerResponse);
      expect(response.data.point).toEqual(controllerResponse.data.point);
      expect(response.data.updatedAt).toEqual(
        controllerResponse.data.updatedAt,
      );
      expect(chargePointUseCase.execute).toBeCalledWith({
        userId: 1,
        point: 100,
      });
    });

    it('포인트가 충전되지 않았을 때 (사용자 정보 오류)', async () => {
      jest
        .spyOn(chargePointUseCase, 'execute')
        .mockRejectedValueOnce(
          new NotFoundException('사용자를 찾을 수 없습니다.'),
        );

      try {
        await pointController.charge({ userId: 1, point: 100 });
        fail('테스트 실패');
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe('사용자를 찾을 수 없습니다.');
        expect(chargePointUseCase.execute).toBeCalledWith({
          userId: 1,
          point: 100,
        });
      }
    });

    it('포인트가 충전되지 않았을 때 (서버 오류)', async () => {
      jest
        .spyOn(chargePointUseCase, 'execute')
        .mockRejectedValueOnce(new InternalServerErrorException());

      try {
        await pointController.charge({ userId: 1, point: 100 });
        fail('테스트 실패');
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
        expect(chargePointUseCase.execute).toBeCalledWith({
          userId: 1,
          point: 100,
        });
      }
    });
  });
});
