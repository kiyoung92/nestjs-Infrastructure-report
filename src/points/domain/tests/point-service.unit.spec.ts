import {
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { CommonModule } from 'src/common/common.module';
import { REPOSITORY_MANAGER } from 'src/database/constants/constants';
import { RepositoryManager } from 'src/database/managers/transaction.manager';
import { DrizzleModule } from 'src/database/orm/drizzle.module';
import { MAX_POINT } from 'src/points/domain/constants/point-entity.constant';
import { PointEntity } from 'src/points/domain/entities/point.entity';
import { POINT_REPOSITORY } from 'src/points/domain/repositories/constants/point-repository.constant';
import { IPointRepository } from 'src/points/domain/repositories/interfaces/point-repository.interface';
import { PointService } from 'src/points/domain/services/point.service';
import { PointRepository } from 'src/points/infrastructure/repositories/point.repository';

describe('PointService', () => {
  const userId = 1;
  const point = 200;
  let pointService: PointService;
  let pointRepositoriy: IPointRepository;
  let repositoryManager: RepositoryManager;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [CommonModule, DrizzleModule],
      providers: [
        PointService,
        {
          provide: POINT_REPOSITORY,
          useClass: PointRepository,
        },
        {
          provide: REPOSITORY_MANAGER,
          useClass: RepositoryManager,
        },
      ],
    }).compile();

    pointService = module.get<PointService>(PointService);
    pointRepositoriy = module.get<IPointRepository>(POINT_REPOSITORY);
    repositoryManager = module.get<RepositoryManager>(REPOSITORY_MANAGER);
    repositoryManager.transaction = jest.fn();
  });

  it('정의 확인', () => {
    expect(pointService).toBeDefined();
    expect(pointRepositoriy).toBeDefined();
  });

  describe('포인트 조회', () => {
    describe('성공', () => {
      it('포인트 조회 성공', async () => {
        const repositoryMockValue = new PointEntity({
          id: 1,
          userId: 1,
          balance: 100,
          updatedAt: '11',
        });
        jest
          .spyOn(pointRepositoriy, 'findOne')
          .mockResolvedValueOnce(repositoryMockValue);

        const result = await pointService.get({ userId: 1 });

        expect(result).toBeInstanceOf(PointEntity);
        expect(result).toEqual(repositoryMockValue);
      });
    });

    describe('실패', () => {
      it('실패: 사용자 정보 없음', async () => {
        jest.spyOn(pointRepositoriy, 'findOne').mockResolvedValueOnce(null);

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
          .spyOn(pointRepositoriy, 'findOne')
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
  });

  describe('포인트 충전', () => {
    beforeEach(() => {
      jest
        .spyOn(repositoryManager, 'transaction')
        .mockImplementation(async (callback: () => Promise<any>) => {
          return await callback();
        });
    });

    describe('성공', () => {
      it('포인트 충전 성공', async () => {
        const repositoryGetMockResult = new PointEntity({
          id: 1,
          userId: 1,
          balance: 100,
          updatedAt: '11',
        });

        jest
          .spyOn(pointRepositoriy, 'findOne')
          .mockResolvedValueOnce(repositoryGetMockResult);
        jest.spyOn(pointRepositoriy, 'setPoint').mockResolvedValueOnce();

        const result = await pointService.charge({ userId, point });

        expect(result).toBeInstanceOf(PointEntity);
        expect(result.balance).toBe(300);
      });
    });

    describe('실패', () => {
      it('실패: 사용자 정보 없음', async () => {
        jest.spyOn(pointRepositoriy, 'findOne').mockResolvedValueOnce(null);

        try {
          await pointService.charge({ userId, point });
          fail('테스트 실패');
        } catch (error) {
          expect(error).toBeInstanceOf(NotFoundException);
          expect(error.message).toBe('사용자 정보가 없습니다.');
        }
      });

      it('실패: 포인트 최대치 초과', async () => {
        const pointRepositoryGetMockResult = new PointEntity({
          id: 1,
          userId: 1,
          balance: MAX_POINT - 100,
          updatedAt: '11',
        });

        jest
          .spyOn(pointRepositoriy, 'findOne')
          .mockResolvedValueOnce(pointRepositoryGetMockResult);

        try {
          await pointService.charge({ userId, point: 200 });
          fail('테스트 실패');
        } catch (error) {
          expect(error).toBeInstanceOf(UnprocessableEntityException);
          expect(error.message).toBe('포인트가 최대치를 초과하였습니다.');
        }
      });

      it('실패: 데이터베이스 오류', async () => {
        jest
          .spyOn(pointRepositoriy, 'findOne')
          .mockRejectedValueOnce(
            new InternalServerErrorException('조회 중 오류가 발생했습니다.'),
          );

        try {
          await pointService.charge({ userId, point });
          fail('테스트 실패');
        } catch (error) {
          expect(error).toBeInstanceOf(InternalServerErrorException);
          expect(error.message).toBe('조회 중 오류가 발생했습니다.');
        }
      });
    });
  });
});
