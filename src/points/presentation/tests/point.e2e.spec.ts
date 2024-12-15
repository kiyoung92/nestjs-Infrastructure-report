import {
  HttpStatus,
  INestApplication,
  InternalServerErrorException,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { eq } from 'drizzle-orm';
import { AppModule } from 'src/app.module';
import { AppConfig } from 'src/common/global-config/app.config';
import { getTimestamp } from 'src/common/utils/dayjs.util';
import { DRIZZLE_PROVIDER } from 'src/database/constants/constants';
import { Mysql2Service } from 'src/database/mysql/mysql.service';
import { points } from 'src/database/schemas/schemas';
import { DrizzleORM } from 'src/database/types/drizzle';
import { POINT_REPOSITORY } from 'src/points/domain/repositories/constants/point-repository.constant';
import { IPointRepository } from 'src/points/domain/repositories/interfaces/point-repository.interface';
import * as request from 'supertest';

describe('Points', () => {
  let app: INestApplication;
  let mysql2Connector: Mysql2Service;
  let pointRepository: IPointRepository;
  let orm: DrizzleORM;
  let updatedTime: string;
  let serverTimestamp: string;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    mysql2Connector = module.get<Mysql2Service>(Mysql2Service);
    orm = module.get<DrizzleORM>(DRIZZLE_PROVIDER);
    pointRepository = module.get<IPointRepository>(POINT_REPOSITORY);
    await AppConfig.beforeAll(app);

    serverTimestamp = new Date().toISOString();
    jest.spyOn(Date.prototype, 'toISOString').mockReturnValue(serverTimestamp);

    updatedTime = getTimestamp();
    await orm
      .update(points)
      .set({ point: 0, updatedAt: updatedTime })
      .where(eq(points.userId, 1));
  });

  afterAll(async () => {
    await mysql2Connector.pool.end();
    await app.close();
  });

  describe('/v1/point/{userId} (GET)', () => {
    describe('성공', () => {
      it('포인트 조회 성공', () => {
        return request(app.getHttpServer())
          .get('/v1/point/1')
          .expect(HttpStatus.OK)
          .expect({
            status: 'success',
            statusCode: HttpStatus.OK,
            message: '포인트 조회가 완료되었습니다.',
            data: {
              point: 0,
              updatedAt: updatedTime,
            },
            timestamp: serverTimestamp,
          });
      });
    });

    describe('실패', () => {
      it('실패: Params이 정수가 아님', () => {
        return request(app.getHttpServer())
          .get('/v1/point/a')
          .expect(HttpStatus.BAD_REQUEST)
          .expect({
            status: 'error',
            statusCode: HttpStatus.BAD_REQUEST,
            message: '잘못된 요청입니다.',
            timestamp: serverTimestamp,
          });
      });

      it('실패: 사용자 정보 없음', () => {
        return request(app.getHttpServer())
          .get('/v1/point/2')
          .expect(HttpStatus.NOT_FOUND)
          .expect({
            status: 'error',
            statusCode: HttpStatus.NOT_FOUND,
            message: '사용자 정보가 없습니다.',
            timestamp: serverTimestamp,
          });
      });

      it('실패: 서버 에러', async () => {
        jest
          .spyOn(pointRepository, 'get')
          .mockRejectedValueOnce(
            new InternalServerErrorException(
              '포인트 조회 중 오류가 발생하였습니다.',
            ),
          );
        return request(app.getHttpServer())
          .get('/v1/point/1')
          .expect(HttpStatus.INTERNAL_SERVER_ERROR)
          .expect({
            status: 'error',
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: '포인트 조회 중 오류가 발생하였습니다.',
            timestamp: serverTimestamp,
          });
      });
    });
  });
});
