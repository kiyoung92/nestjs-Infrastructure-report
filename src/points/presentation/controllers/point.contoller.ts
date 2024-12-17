import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { GlobalResponse } from 'src/common/responses/global-response';
import { SetOpenAPI } from 'src/common/swaggers/decorators/swagger.decorator';
import { serializationUtils } from 'src/common/utils/serialization.util';
import { ChargePointUseCase } from 'src/points/application/use-cases/charge-point.use-case';
import { GetPointUseCase } from 'src/points/application/use-cases/get-point.use-case';
import { ChargePointDto } from 'src/points/presentation/dtos/charge-point-request.dto';
import { PointResponseDto } from 'src/points/presentation/dtos/point-response.dto';
import { pointSwaggerConfig } from 'src/points/presentation/swagger/point-controller.swagger';

@Controller('point')
export class PointController {
  constructor(
    private readonly getPointUseCase: GetPointUseCase,
    private readonly chargePointUseCase: ChargePointUseCase,
  ) {}

  @SetOpenAPI(pointSwaggerConfig)
  @Get('/:userId')
  async get(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<GlobalResponse<PointResponseDto>> {
    const pointEntity = await this.getPointUseCase.execute({
      userId: userId,
    });

    return GlobalResponse.success({
      statusCode: HttpStatus.OK,
      message: '포인트 조회가 완료되었습니다.',
      data: serializationUtils.entityToDto({
        dto: PointResponseDto,
        entity: pointEntity,
      }),
    });
  }

  @SetOpenAPI(pointSwaggerConfig)
  @Post('/charge')
  async charge(
    @Body() dto: ChargePointDto,
  ): Promise<GlobalResponse<PointResponseDto>> {
    const pointEntity = await this.chargePointUseCase.execute({
      userId: dto.userId,
      point: dto.point,
    });

    return GlobalResponse.success({
      statusCode: HttpStatus.CREATED,
      message: '포인트 충전이 완료되었습니다.',
      data: serializationUtils.entityToDto({
        dto: PointResponseDto,
        entity: pointEntity,
      }),
    });
  }
}
