import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { CommonModule } from 'src/common/common.module';
import { GetPointUseCase } from 'src/points/application/use-cases/get-point.use-case';
import { PointEntity } from 'src/points/domain/entities/point.entity';
import { PointDomainModule } from 'src/points/domain/point-domain.module';
import { PointService } from 'src/points/domain/services/point.service';

describe('GetPointUseCase', () => {
  let getPointUseCase: GetPointUseCase;
  let pointService: PointService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [CommonModule, PointDomainModule],
      providers: [GetPointUseCase],
    }).compile();
    getPointUseCase = module.get<GetPointUseCase>(GetPointUseCase);
    pointService = module.get<PointService>(PointService);
  });

  it('정의 확인', () => {
    expect(getPointUseCase).toBeDefined();
    expect(pointService).toBeDefined();
  });

  const mockDate = new Date().toISOString();
  jest.spyOn(Date.prototype, 'toISOString').mockReturnValue(mockDate);

  describe('성공', () => {
    it('포인트 조회 성공', async () => {
      const serviceMockResult = new PointEntity({
        id: 1,
        userId: 1,
        balance: 100,
        updatedAt: '11',
      });

      jest.spyOn(pointService, 'get').mockResolvedValueOnce(serviceMockResult);

      const result = await getPointUseCase.execute({ userId: 1 });

      expect(result).toEqual(serviceMockResult);
      expect(pointService.get).toBeCalledWith({ userId: 1 });
    });
  });

  describe('실패', () => {
    it('실패: 사용자 정보 없음', async () => {
      jest
        .spyOn(pointService, 'get')
        .mockRejectedValueOnce(
          new NotFoundException('사용자 정보가 없습니다.'),
        );

      try {
        await getPointUseCase.execute({ userId: 0 });
        fail('테스트 실패');
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual('사용자 정보가 없습니다.');
      }
    });
  });
});
