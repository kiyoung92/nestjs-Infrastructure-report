import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { GlobalResponse } from 'src/application/config/response/global-response';
import { ChargePointUseCase } from 'src/application/use-cases/point/charge-point.use-case';
import { GetPointUseCase } from 'src/application/use-cases/point/get-point.use-case';
import { pointSwaggerConfig } from 'src/presentation/config/swagger/point.swagger';
import { SetSwagger } from 'src/presentation/decorators/swagger.decorator';
import { PointRequestDto } from 'src/presentation/dtos/point/point-request.dto';
import { PointResponseDto } from 'src/presentation/dtos/point/point-response.dto';
import { IPointCotroller } from 'src/presentation/interface/controllers/point-controller.interface';
import { serializationUtils } from 'src/presentation/utils/serialization.util';

@Controller('point')
export class PointController implements IPointCotroller {
  constructor(
    private readonly chargePointUseCase: ChargePointUseCase,
    private readonly getPointUseCase: GetPointUseCase,
  ) {}
  @SetSwagger(pointSwaggerConfig)
  @Get(':userId')
  async get(@Param('userId', ParseIntPipe) userId: number) {
    const useCaseResponse = await this.getPointUseCase.execute({ userId });

    return GlobalResponse.success({
      statusCode: 200,
      message: '포인트 조회에 성공하였습니다.',
      data: serializationUtils.dto({
        dto: PointResponseDto,
        entity: useCaseResponse,
      }),
    });
  }

  @SetSwagger(pointSwaggerConfig)
  @Post('/charge')
  async charge(@Body() dto: PointRequestDto) {
    const useCaseResponse = await this.chargePointUseCase.execute({
      userId: dto.userId,
      point: dto.point,
    });

    return GlobalResponse.success({
      statusCode: 200,
      message: '포인트 충전에 성공하였습니다.',
      data: serializationUtils.dto({
        dto: PointResponseDto,
        entity: useCaseResponse,
      }),
    });
  }
}
