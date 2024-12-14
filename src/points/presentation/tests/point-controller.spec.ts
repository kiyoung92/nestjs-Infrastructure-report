import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { GlobalResponse } from 'src/common/responses/global-response';
import { serializationUtils } from 'src/common/utils/serialization.util';
import { GetPointUseCase } from 'src/points/application/use-cases/get-point.use-case';
import { PointEntity } from 'src/points/domain/entities/point.entity';
import { PointController } from 'src/points/presentation/controllers/point.contoller';
import { PointResponseDto } from 'src/points/presentation/dtos/point-response.dto';

// TODO: BadRequestException(validator error 등)은 e2e 테스트에서 확인

describe('PointController', () => {
  let controller: PointController;
  let getPointUseCase: GetPointUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      controllers: [],
    }).compile();

    controller = module.get<PointController>(PointController);
    getPointUseCase = module.get<GetPointUseCase>(GetPointUseCase);
  });

  it('정의 확인', () => {
    expect(controller).toBeDefined();
  });

  const mockDate = new Date().toISOString();
  jest.spyOn(Date.prototype, 'toISOString').mockReturnValue(mockDate);

  describe('포인트 조회', () => {
    it('성공', async () => {
      const entity = new PointEntity({
        id: 1,
        userId: 1,
        point: 100,
        updatedAt: '11',
      });
      const mockResult = GlobalResponse.success({
        statusCode: 200,
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
