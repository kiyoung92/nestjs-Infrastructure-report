import {
  BadRequestException,
  HttpStatus,
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { GlobalResponse } from 'src/common/responses/global-response';
import { serializationUtils } from 'src/common/utils/serialization.util';
import { ChargePointUseCase } from 'src/points/application/use-cases/charge-point.use-case';
import { GetPointUseCase } from 'src/points/application/use-cases/get-point.use-case';
import { PointEntity } from 'src/points/domain/entities/point.entity';
import { PointController } from 'src/points/presentation/controllers/point.contoller';
import { PointResponseDto } from 'src/points/presentation/dtos/point-response.dto';

// TODO: BadRequestException(validator error 등)은 e2e 테스트에서 확인

describe('PointController', () => {
  let controller: PointController;
  let getPointUseCase: GetPointUseCase;
  let chargePointUseCase: ChargePointUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      controllers: [],
    }).compile();

    controller = module.get<PointController>(PointController);
    getPointUseCase = module.get<GetPointUseCase>(GetPointUseCase);
    chargePointUseCase = module.get<ChargePointUseCase>(ChargePointUseCase);
  });

  it('정의 확인', () => {
    expect(controller).toBeDefined();
  });

  const mockDate = new Date().toISOString();
  jest.spyOn(Date.prototype, 'toISOString').mockReturnValue(mockDate);

  describe('포인트 조회', () => {
    describe('성공', () => {
      it('포인트 조회 성공', async () => {
        const entity = new PointEntity({
          id: 1,
          userId: 1,
          point: 100,
          updatedAt: '11',
        });
        const mockResult = GlobalResponse.success({
          statusCode: HttpStatus.OK,
          message: '포인트 조회가 완료되었습니다.',
          data: serializationUtils.entityToDto({
            dto: PointResponseDto,
            entity,
          }),
        });

        jest.spyOn(getPointUseCase, 'execute').mockResolvedValueOnce(entity);

        const response = await controller.get(1);

        expect(response).toEqual(mockResult);
      });
    });

    describe('실패', () => {
      it('실패: 입력 값 오류', async () => {
        jest
          .spyOn(getPointUseCase, 'execute')
          .mockRejectedValueOnce(new BadRequestException('잘못된 요청입니다.'));

        try {
          await controller.get(1);
          fail('테스트 실패');
        } catch (error) {
          expect(error).toBeInstanceOf(BadRequestException);
          expect(error.message).toEqual('잘못된 요청입니다.');
        }
      });
    });
  });

  describe('포인트 충전', () => {
    describe('성공', () => {
      it('포인트 충전 성공', async () => {
        const pointEntity = new PointEntity({
          id: 1,
          userId: 1,
          point: 100,
          updatedAt: '11',
        });

        const mockResult = GlobalResponse.success({
          statusCode: HttpStatus.CREATED,
          message: '포인트 충전이 완료되었습니다.',
          data: serializationUtils.entityToDto({
            dto: PointResponseDto,
            entity: pointEntity,
          }),
        });

        jest
          .spyOn(chargePointUseCase, 'execute')
          .mockResolvedValueOnce(pointEntity);

        const response = await controller.charge({
          userId: 1,
          point: 100,
        });

        expect(response).toEqual(mockResult);
      });
    });

    describe('실패', () => {
      it('실패: 사용자 정보 없음', async () => {
        jest
          .spyOn(chargePointUseCase, 'execute')
          .mockRejectedValueOnce(
            new BadRequestException('사용자 정보가 없습니다.'),
          );

        try {
          await controller.charge({
            userId: 1,
            point: 100,
          });
          fail('테스트 실패');
        } catch (error) {
          expect(error).toBeInstanceOf(BadRequestException);
          expect(error.message).toEqual('사용자 정보가 없습니다.');
        }
      });

      it('실패: 충전 금액 초과', async () => {
        jest
          .spyOn(chargePointUseCase, 'execute')
          .mockRejectedValueOnce(
            new UnprocessableEntityException(
              '포인트가 최대치를 초과하였습니다.',
            ),
          );

        try {
          await controller.charge({
            userId: 1,
            point: 100,
          });
          fail('테스트 실패');
        } catch (error) {
          expect(error).toBeInstanceOf(UnprocessableEntityException);
          expect(error.message).toEqual('포인트가 최대치를 초과하였습니다.');
        }
      });

      it('실패: 데이터 베이스 오류', async () => {
        jest
          .spyOn(chargePointUseCase, 'execute')
          .mockRejectedValueOnce(
            new InternalServerErrorException(
              '포인트 충전 중 오류가 발생하였습니다.',
            ),
          );

        try {
          await controller.charge({
            userId: 1,
            point: 100,
          });
          fail('테스트 실패');
        } catch (error) {
          expect(error).toBeInstanceOf(InternalServerErrorException);
          expect(error.message).toEqual(
            '포인트 충전 중 오류가 발생하였습니다.',
          );
        }
      });
    });
  });
});
