import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/application/app.module';
import { GetPointUseCase } from 'src/application/use-cases/point/get-point.use-case';
import { UseCaseModule } from 'src/application/use-cases/use-case.module';
import { Point } from 'src/domain/entities/point.entity';
import { PointService } from 'src/domain/services/point.service';
import { PointRepository } from 'src/infrastructure/repositories/point.repository';

describe('GetPointUseCase', () => {
  let getPointUseCase: GetPointUseCase;
  let pointRepository: PointRepository;
  let pointService: PointService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, UseCaseModule],
      providers: [],
    }).compile();

    getPointUseCase = moduleRef.get(GetPointUseCase);
    pointRepository = moduleRef.get(PointRepository);
    pointService = moduleRef.get(PointService);
  });

  it('포인트가 정상으로 조회되었을 때', async () => {
    const userId = 1;
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
    jest.spyOn(pointRepository, 'find').mockResolvedValueOnce(mockPoint);
    jest.spyOn(pointService, 'findEntity').mockReturnValueOnce(result);

    const executeResult = await getPointUseCase.execute({ userId });

    expect(executeResult).toEqual(result);
    expect(executeResult.id).toBe(result.id);
    expect(executeResult.userId).toBe(result.userId);
    expect(executeResult.point).toBe(result.point);
    expect(executeResult.updatedAt).toBe(result.updatedAt);

    expect(pointRepository.find).toHaveBeenCalledTimes(1);
    expect(pointRepository.find).toHaveBeenCalledWith(userId);
    expect(pointService.findEntity).toHaveBeenCalledTimes(1);
    expect(pointService.findEntity).toHaveBeenCalledWith(mockPoint);
  });

  it('포인트가 조회되지 않았을 때', async () => {
    jest.spyOn(pointRepository, 'find').mockResolvedValueOnce([]);
    jest.spyOn(pointService, 'findEntity').mockImplementationOnce(() => {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    });
    const userId = 1;

    try {
      await getPointUseCase.execute({ userId });
      fail('테스트 실패');
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toBe('사용자를 찾을 수 없습니다.');
      expect(pointRepository.find).toHaveBeenCalledTimes(1);
      expect(pointRepository.find).toHaveBeenCalledWith(userId);
      expect(pointService.findEntity).toHaveBeenCalledTimes(1);
    }
  });

  it('포인트 조회 중 에러가 발생했을 때', async () => {
    jest
      .spyOn(pointRepository, 'find')
      .mockRejectedValueOnce(
        new InternalServerErrorException('포인트 조회 중 오류가 발생했습니다.'),
      );
    jest.spyOn(pointService, 'findEntity').mockImplementationOnce(() => {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    });
    const userId = 1;

    try {
      await getPointUseCase.execute({ userId });
      fail('Expected Error to be thrown');
    } catch (error) {
      expect(error).toBeInstanceOf(InternalServerErrorException);
      expect(error.message).toBe('포인트 조회 중 오류가 발생했습니다.');
      expect(pointRepository.find).toHaveBeenCalledTimes(1);
      expect(pointRepository.find).toHaveBeenCalledWith(userId);
      expect(pointService.findEntity).toHaveBeenCalledTimes(0);
    }
  });
});
