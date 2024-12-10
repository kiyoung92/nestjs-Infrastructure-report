import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ChargePointUseCase } from 'src/application/point/use-cases/charge-point.use-case';
import { GetPointUseCase } from 'src/application/point/use-cases/get-point.use-case';
import { GlobalResponse } from 'src/common/responses/global-response';
import { SetSwagger } from 'src/common/swaggers/decorators/swagger.decorator';
import { serializationUtils } from 'src/common/utils/serialization.util';
import { PointRequestDto } from 'src/presentation/point/dtos/point-request.dto';
import { PointResponseDto } from 'src/presentation/point/dtos/point-response.dto';
import { IPointCotroller } from 'src/presentation/point/interfaces/point-controller.interface';
import { pointSwaggerConfig } from 'src/presentation/point/swaggers/point.swagger';

@Controller('point')
export class PointController implements IPointCotroller {
  constructor(
    private readonly getPointUseCase: GetPointUseCase,
    private readonly chargePointUseCase: ChargePointUseCase,
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
