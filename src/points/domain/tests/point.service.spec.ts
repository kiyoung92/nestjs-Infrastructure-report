import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { CommonModule } from 'src/common/common.module';
import { DrizzleModule } from 'src/database/orm/drizzle.module';
import { PointEntity } from 'src/points/domain/entities/point.entity';
import { POINT_REPOSITORY } from 'src/points/domain/repositories/constants/point-repository.constant';
import { IPointRepository } from 'src/points/domain/repositories/interfaces/point-repository.interface';
import { PointService } from 'src/points/domain/services/point.service';
import { PointRepository } from 'src/points/infrastructure/repositories/point.repository';

describe('PointService', () => {
  let pointService: PointService;
  let pointRepositoriy: IPointRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [CommonModule, DrizzleModule],
      providers: [
        PointService,
        {
          provide: POINT_REPOSITORY,
          useClass: PointRepository,
        },
      ],
    }).compile();

    pointService = module.get<PointService>(PointService);
    pointRepositoriy = module.get<IPointRepository>(POINT_REPOSITORY);
  });

  it('should be defined', () => {
    expect(pointService).toBeDefined();
    expect(pointRepositoriy).toBeDefined();
  });

  describe('Get Point', () => {
    it('성공', async () => {
      const repositoryMockValue = new PointEntity({
        id: 1,
        userId: 1,
        point: 100,
        updatedAt: '11',
      });
      jest
        .spyOn(pointRepositoriy, 'get')
        .mockResolvedValueOnce(repositoryMockValue);

      const result = await pointService.get({ userId: 1 });

      expect(result).toBeInstanceOf(PointEntity);
      expect(result.id).toBe(repositoryMockValue.id);
      expect(result.userId).toBe(repositoryMockValue.userId);
      expect(result.point).toBe(repositoryMockValue.point);
      expect(result.updatedAt).toBe(repositoryMockValue.updatedAt);
    });
  });

  it('실패: 사용자 정보 없음', async () => {
    jest.spyOn(pointRepositoriy, 'get').mockResolvedValueOnce(null);

    try {
      await pointService.get({ userId: 1 });
      fail('테스트 실패');
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toBe('사용자 정보가 없습니다.');
    }
  });

  it('실패: 데이터베이스 오류', async () => {
    jest
      .spyOn(pointRepositoriy, 'get')
      .mockRejectedValueOnce(
        new InternalServerErrorException('조회 중 오류가 발생했습니다.'),
      );

    try {
      await pointService.get({ userId: 1 });
      fail('테스트 실패');
    } catch (error) {
      expect(error).toBeInstanceOf(InternalServerErrorException);
      expect(error.message).toBe('조회 중 오류가 발생했습니다.');
    }
  });
});
