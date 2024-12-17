import {
  BadRequestException,
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { CommonModule } from 'src/common/common.module';
import { ChargePointUseCase } from 'src/points/application/use-cases/charge-point.use-case';
import { PointEntity } from 'src/points/domain/entities/point.entity';
import { PointDomainModule } from 'src/points/domain/point-domain.module';
import { PointService } from 'src/points/domain/services/point.service';

describe('ChargePointUseCase', () => {
  const userId = 1;
  const point = 100;
  let chargePointUseCase: ChargePointUseCase;
  let pointService: PointService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [CommonModule, PointDomainModule],
      providers: [ChargePointUseCase],
    }).compile();

    chargePointUseCase = module.get<ChargePointUseCase>(ChargePointUseCase);
    pointService = module.get<PointService>(PointService);
  });

  it('should be defined', () => {
    expect(chargePointUseCase).toBeDefined();
    expect(pointService).toBeDefined();
  });

  describe('성공', () => {
    it('포인트 충전 성공', async () => {
      const serviceMockResult = new PointEntity({
        id: 1,
        userId,
        balance: point,
        updatedAt: '11',
      });

      jest
        .spyOn(pointService, 'charge')
        .mockResolvedValueOnce(serviceMockResult);

      const result = await chargePointUseCase.execute({ userId, point });

      expect(result).toEqual(serviceMockResult);
      expect(pointService.charge).toBeCalledWith({ userId, point });
    });
  });

  describe('실패', () => {
    it('실패: 사용자 정보 없음', async () => {
      jest
        .spyOn(pointService, 'charge')
        .mockRejectedValueOnce(
          new BadRequestException('사용자 정보가 없습니다.'),
        );

      try {
        await chargePointUseCase.execute({ userId, point });
        fail('테스트 실패');
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toEqual('사용자 정보가 없습니다.');
      }
    });

    it('실패: 충전 금액 초과', async () => {
      jest
        .spyOn(pointService, 'charge')
        .mockRejectedValueOnce(
          new UnprocessableEntityException('충전 금액이 초과되었습니다.'),
        );

      try {
        await chargePointUseCase.execute({ userId, point });
        fail('테스트 실패');
      } catch (error) {
        expect(error).toBeInstanceOf(UnprocessableEntityException);
        expect(error.message).toEqual('충전 금액이 초과되었습니다.');
      }
    });

    it('실패: 데이터베이스 오류', async () => {
      jest
        .spyOn(pointService, 'charge')
        .mockRejectedValueOnce(
          new InternalServerErrorException(
            '포인트 충전 중 오류가 발생하였습니다.',
          ),
        );

      try {
        await chargePointUseCase.execute({ userId, point });
        fail('테스트 실패');
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
        expect(error.message).toEqual('포인트 충전 중 오류가 발생하였습니다.');
      }
    });
  });
});
