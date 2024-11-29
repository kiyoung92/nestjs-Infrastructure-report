import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { IPointCotroller } from 'src/application/interfaces/controllers/point-controller.interface';
import { GlobalResponse } from 'src/infrastructure/response/global-response';
import { pointSwaggerConfig } from 'src/presentation/config/swagger/point.swagger';
import { SetSwagger } from 'src/presentation/decorators/swagger.decorator';
import { PointRequestDto } from 'src/presentation/dtos/point/point-request.dto';

@Controller('point')
export class PointController implements IPointCotroller {
  @SetSwagger(pointSwaggerConfig)
  @Post('/charge')
  async charge(@Body() dto: PointRequestDto) {
    return GlobalResponse.success({
      statusCode: 200,
      message: '포인트 충전에 성공했습니다.',
      data: {
        point: 10000,
        updatedAt: '2021-01-01 00:00:00.111',
      },
    });
  }

  @SetSwagger(pointSwaggerConfig)
  @Get(':userId')
  async get(@Param('userId', ParseIntPipe) userId: number) {
    return GlobalResponse.success({
      statusCode: 200,
      message: '포인트 사용에 성공했습니다.',
      data: {
        point: 10000,
        updatedAt: '2021-01-01 00:00:00.111',
      },
    });
  }
}
