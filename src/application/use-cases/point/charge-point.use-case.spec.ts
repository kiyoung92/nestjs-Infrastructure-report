import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/application/app.module';
import { ChargePointUseCase } from 'src/application/use-cases/point/charge-point.use-case';
import { UseCaseModule } from 'src/application/use-cases/use-case.module';
import { Point } from 'src/domain/entities/point.entity';
import { TransactionManager } from 'src/infrastructure/managers/transaction.manager';

describe('ChargePointUseCase', () => {
  let chargePointUseCase: ChargePointUseCase;
  let transactionManager: TransactionManager;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, UseCaseModule],
      providers: [],
    }).compile();

    chargePointUseCase = moduleRef.get(ChargePointUseCase);
    transactionManager = moduleRef.get(TransactionManager);
  });

  it('포인트가 정상으로 충전되었을 때', async () => {
    const userId = 1;
    const point = 100;
    const mockPoint = [
      {
        id: 1,
        userId: 1,
        point: 100,
        updatedAt: '2021-01-01 00:00:00.111',
      },
    ];
    const result = new Point(
      mockPoint[0].id,
      mockPoint[0].userId,
      mockPoint[0].point,
      mockPoint[0].updatedAt,
    );

    jest
      .spyOn(transactionManager, 'transaction')
      .mockImplementation(async () => {
        return result;
      });

    const executeResult = await chargePointUseCase.execute({ userId, point });

    expect(executeResult).toEqual(result);
    expect(executeResult.id).toBe(result.id);
    expect(executeResult.userId).toBe(result.userId);
    expect(executeResult.point).toBe(result.point);
    expect(executeResult.updatedAt).toBe(result.updatedAt);
  });

  it('포인트가 충전되지 않았을 때', async () => {
    const userId = 1;
    const point = 100;
    jest
      .spyOn(transactionManager, 'transaction')
      .mockRejectedValueOnce(
        new NotFoundException('사용자를 찾을 수 없습니다.'),
      );

    try {
      await chargePointUseCase.execute({ userId, point });
      fail('테스트 실패');
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toBe('사용자를 찾을 수 없습니다.');
    }
  });

  it('포인트 충전 중 오류가 발생했을 때', async () => {
    const userId = 1;
    const point = 100;
    jest
      .spyOn(transactionManager, 'transaction')
      .mockRejectedValueOnce(
        new InternalServerErrorException('포인트 충전 중 오류가 발생했습니다.'),
      );

    try {
      await chargePointUseCase.execute({ userId, point });
      fail('테스트 실패');
    } catch (error) {
      expect(error).toBeInstanceOf(InternalServerErrorException);
      expect(error.message).toBe('포인트 충전 중 오류가 발생했습니다.');
    }
  });
});
