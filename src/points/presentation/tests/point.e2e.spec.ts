import {
  HttpStatus,
  INestApplication,
  InternalServerErrorException,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { eq, sql } from 'drizzle-orm';
import { AppModule } from 'src/app.module';
import { AppConfig } from 'src/common/global-config/app.config';
import { dayjsUtil } from 'src/common/utils/dayjs.util';
import { DRIZZLE_PROVIDER } from 'src/database/constants/constants';
import { Mysql2Service } from 'src/database/mysql/mysql.service';
import { points, users } from 'src/database/schemas/schemas';
import { DrizzleORM } from 'src/database/types/drizzle';
import { POINT_REPOSITORY } from 'src/points/domain/repositories/constants/point-repository.constant';
import { IPointRepository } from 'src/points/domain/repositories/interfaces/point-repository.interface';
import * as request from 'supertest';

describe('Points', () => {
  const userId = 1;
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

    updatedTime = dayjsUtil.getTimestamp();
    serverTimestamp = new Date().toISOString();
    jest.spyOn(Date.prototype, 'toISOString').mockReturnValue(serverTimestamp);
    jest.spyOn(dayjsUtil, 'getTimestamp').mockReturnValue(updatedTime);

    const isUser = await orm.select().from(users).where(eq(users.id, userId));
    if (!isUser.length) {
      await orm.insert(users).values({
        name: 'test',
        createdAt: updatedTime,
        updatedAt: updatedTime,
      });

      await orm.insert(points).values({
        userId,
        balance: 0,
        updatedAt: updatedTime,
      });
    }
  });

  afterAll(async () => {
    await orm.execute(sql`SET foreign_key_checks = 0;`);
    await orm.execute(sql`truncate point_histories;`);
    await orm.execute(sql`truncate points;`);
    await orm.execute(sql`truncate users;`);
    await orm.execute(sql`set foreign_key_checks = 1;`);
    await mysql2Connector.pool.end();
    await app.close();
  });

  beforeEach(async () => {
    await orm
      .update(points)
      .set({ balance: 0, updatedAt: updatedTime })
      .where(eq(points.userId, 1));
  });

  describe('/v1/point/{userId} (GET)', () => {
    describe('성공', () => {
      it('포인트 조회 성공', async () => {
        return await request(app.getHttpServer())
          .get('/v1/point/1')
          .expect(HttpStatus.OK)
          .expect({
            status: 'success',
            statusCode: HttpStatus.OK,
            message: '포인트 조회가 완료되었습니다.',
            data: {
              balance: 0,
              updatedAt: updatedTime,
            },
            timestamp: serverTimestamp,
          });
      });
    });

    describe('실패', () => {
      it('실패: Params이 정수가 아님 (400)', async () => {
        return await request(app.getHttpServer())
          .get('/v1/point/a')
          .expect(HttpStatus.BAD_REQUEST)
          .expect({
            status: 'error',
            statusCode: HttpStatus.BAD_REQUEST,
            message: '잘못된 요청입니다.',
            timestamp: serverTimestamp,
          });
      });

      it('실패: 사용자 정보 없음 (404)', async () => {
        return await request(app.getHttpServer())
          .get('/v1/point/2')
          .expect(HttpStatus.NOT_FOUND)
          .expect({
            status: 'error',
            statusCode: HttpStatus.NOT_FOUND,
            message: '사용자 정보가 없습니다.',
            timestamp: serverTimestamp,
          });
      });

      it('실패: 서버 에러 (500)', async () => {
        jest
          .spyOn(pointRepository, 'findOne')
          .mockRejectedValueOnce(
            new InternalServerErrorException('일시적인 오류가 발생하였습니다.'),
          );
        return await request(app.getHttpServer())
          .get('/v1/point/1')
          .expect(HttpStatus.INTERNAL_SERVER_ERROR)
          .expect({
            status: 'error',
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: '일시적인 오류가 발생하였습니다.',
            timestamp: serverTimestamp,
          });
      });
    });
  });

  describe('/v1/point/charge (POST)', () => {
    describe('성공', () => {
      it('포인트 충전 성공', async () => {
        return await request(app.getHttpServer())
          .post('/v1/point/charge')
          .send({
            userId,
            point: 1000,
          })
          .expect(HttpStatus.CREATED)
          .expect({
            status: 'success',
            statusCode: HttpStatus.CREATED,
            message: '포인트 충전이 완료되었습니다.',
            data: {
              balance: 1000,
              updatedAt: updatedTime,
            },
            timestamp: serverTimestamp,
          });
      });

      it('포인트 충전 성공: 동시성 테스트', async () => {
        const promises = new Array(10).fill(null).map(() =>
          request(app.getHttpServer()).post('/v1/point/charge').send({
            userId,
            point: 999,
          }),
        );

        const response = await Promise.all(promises);
        response.forEach((res) => {
          expect(res.status).toBe(HttpStatus.CREATED);
        });

        return await request(app.getHttpServer())
          .get('/v1/point/1')
          .expect(HttpStatus.OK)
          .expect({
            status: 'success',
            statusCode: HttpStatus.OK,
            message: '포인트 조회가 완료되었습니다.',
            data: {
              balance: 9990,
              updatedAt: updatedTime,
            },
            timestamp: serverTimestamp,
          });
      });
    });

    describe('실패', () => {
      it('실패: Request Body 누락 (400)', async () => {
        return await request(app.getHttpServer())
          .post('/v1/point/charge')
          .expect(HttpStatus.BAD_REQUEST)
          .expect({
            status: 'error',
            statusCode: HttpStatus.BAD_REQUEST,
            message: '잘못된 요청입니다.',
            timestamp: serverTimestamp,
          });
      });

      it('실패: userId 누락 (400)', async () => {
        return await request(app.getHttpServer())
          .post('/v1/point/charge')
          .send({ point: 1000 })
          .expect(HttpStatus.BAD_REQUEST)
          .expect({
            status: 'error',
            statusCode: HttpStatus.BAD_REQUEST,
            message: '잘못된 요청입니다.',
            timestamp: serverTimestamp,
          });
      });

      it('실패: point 누락 (400)', async () => {
        return await request(app.getHttpServer())
          .post('/v1/point/charge')
          .send({ userId })
          .expect(HttpStatus.BAD_REQUEST)
          .expect({
            status: 'error',
            statusCode: HttpStatus.BAD_REQUEST,
            message: '잘못된 요청입니다.',
            timestamp: serverTimestamp,
          });
      });

      it('실패: userId가 정수가 아님 (400)', async () => {
        return await request(app.getHttpServer())
          .post('/v1/point/charge')
          .send({ userId: 'a', point: 1000 })
          .expect(HttpStatus.BAD_REQUEST)
          .expect({
            status: 'error',
            statusCode: HttpStatus.BAD_REQUEST,
            message: '잘못된 요청입니다.',
            timestamp: serverTimestamp,
          });
      });

      it('실패: point가 정수가 아님 (400)', async () => {
        return await request(app.getHttpServer())
          .post('/v1/point/charge')
          .send({ userId, point: 'a' })
          .expect(HttpStatus.BAD_REQUEST)
          .expect({
            status: 'error',
            statusCode: HttpStatus.BAD_REQUEST,
            message: '잘못된 요청입니다.',
            timestamp: serverTimestamp,
          });
      });

      it('실패: 충전 포인트가 0보다 작음 (400)', async () => {
        return await request(app.getHttpServer())
          .post('/v1/point/charge')
          .send({ userId, point: -1000 })
          .expect(HttpStatus.BAD_REQUEST)
          .expect({
            status: 'error',
            statusCode: HttpStatus.BAD_REQUEST,
            message: '잘못된 요청입니다.',
            timestamp: serverTimestamp,
          });
      });

      it('실패: 충전 금액이 MAX_POINT 이상 (400)', async () => {
        return await request(app.getHttpServer())
          .post('/v1/point/charge')
          .send({ userId, point: 1000001 })
          .expect(HttpStatus.BAD_REQUEST)
          .expect({
            status: 'error',
            statusCode: HttpStatus.BAD_REQUEST,
            message: '잘못된 요청입니다.',
            timestamp: serverTimestamp,
          });
      });

      it('실패: 충전된 금액이 MAX_POINT 초과 (422)', async () => {
        await request(app.getHttpServer())
          .post('/v1/point/charge')
          .send({ userId, point: 1000000 })
          .expect(HttpStatus.CREATED);

        return await request(app.getHttpServer())
          .post('/v1/point/charge')
          .send({ userId, point: 1 })
          .expect(HttpStatus.UNPROCESSABLE_ENTITY)
          .expect({
            status: 'error',
            statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
            message: '포인트가 최대치를 초과하였습니다.',
            timestamp: serverTimestamp,
          });
      });

      it('실패: 사용자 정보 없음 (404)', async () => {
        return await request(app.getHttpServer())
          .post('/v1/point/charge')
          .send({ userId: 2, point: 1000 })
          .expect(HttpStatus.NOT_FOUND)
          .expect({
            status: 'error',
            statusCode: HttpStatus.NOT_FOUND,
            message: '사용자 정보가 없습니다.',
            timestamp: serverTimestamp,
          });
      });

      it('실패: 서버 에러 (500)', async () => {
        jest
          .spyOn(pointRepository, 'findOne')
          .mockRejectedValueOnce(
            new InternalServerErrorException('일시적인 오류가 발생하였습니다.'),
          );
        return await request(app.getHttpServer())
          .post('/v1/point/charge')
          .send({ userId, point: 1000 })
          .expect(HttpStatus.INTERNAL_SERVER_ERROR)
          .expect({
            status: 'error',
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: '일시적인 오류가 발생하였습니다.',
            timestamp: serverTimestamp,
          });
      });
    });
  });
});
