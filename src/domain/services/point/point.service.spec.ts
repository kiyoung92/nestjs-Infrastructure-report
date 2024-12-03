import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/application/app.module';
import { DomainModule } from 'src/domain/domain.module';
import { Point } from 'src/domain/entities/point/point.entity';
import { PointService } from 'src/domain/services/point/point.service';
import * as timestampModule from 'src/domain/utils/dayjs.util';

describe('PointService', () => {
  let pointService: PointService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DomainModule],
      providers: [],
    }).compile();

    pointService = moduleRef.get(PointService);
  });

  const updatedAt = '2021-01-01 00:00:00.111';
  jest.spyOn(timestampModule, 'getTimestamp').mockReturnValue(updatedAt);

  describe('findEntity', () => {
    it('포인트가 정상으로 조회되었을 때', () => {
      const mockPoint = [
        {
          id: 1,
          userId: 1,
          point: 100,
          updatedAt: updatedAt,
        },
      ];
      const result = new Point({
        id: mockPoint[0].id,
        userId: mockPoint[0].userId,
        point: mockPoint[0].point,
        updatedAt: mockPoint[0].updatedAt,
      });

      const executeResult = pointService.findEntity({
        pointRepositoryRows: mockPoint,
      });

      expect(executeResult).toEqual(result);
      expect(executeResult.id).toBe(result.id);
      expect(executeResult.userId).toBe(result.userId);
      expect(executeResult.point).toBe(result.point);
      expect(executeResult.updatedAt).toBe(result.updatedAt);
    });

    it('포인트가 조회되지 않았을 때', () => {
      try {
        pointService.findEntity({
          pointRepositoryRows: [],
        });
        fail('테스트 실패');
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe('사용자를 찾을 수 없습니다.');
      }
    });
  });

  describe('charge', () => {
    it('포인트가 정상으로 충전되었을 때', () => {
      const point = 100;
      const mockPoint = [
        {
          id: 1,
          userId: 1,
          point: 100,
          updatedAt: updatedAt,
        },
      ];
      const result = new Point({
        id: mockPoint[0].id,
        userId: mockPoint[0].userId,
        point: mockPoint[0].point,
        updatedAt: mockPoint[0].updatedAt,
      });

      result.chargePoint(point);

      const executeResult = pointService.charge({
        pointRepositoryRows: mockPoint,
        point,
      });

      expect(executeResult).toEqual(result);
      expect(executeResult.id).toBe(result.id);
      expect(executeResult.userId).toBe(result.userId);
      expect(executeResult.point).toBe(result.point);
      expect(executeResult.updatedAt).toBe(result.updatedAt);
    });

    it('포인트가 충전되지 않았을 때', () => {
      try {
        pointService.charge({
          pointRepositoryRows: [],
          point: 100,
        });
        fail('테스트 실패');
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe('사용자를 찾을 수 없습니다.');
      }
    });
  });
});
