import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { GlobalResponse } from 'src/common/responses/global-response';
import { SetOpenAPI } from 'src/common/swaggers/decorators/swagger.decorator';
import { serializationUtils } from 'src/common/utils/serialization.util';
import { GetPointUseCase } from 'src/points/application/use-cases/get-point.use-case';
import { PointResponseDto } from 'src/points/presentation/dtos/point-response.dto';
import { pointSwaggerConfig } from 'src/points/presentation/swagger/point-controller.swagger';

@Controller('point')
export class PointController {
  constructor(private readonly getPointUseCase: GetPointUseCase) {}

  @SetOpenAPI(pointSwaggerConfig)
  @Get(':userId')
  async get(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<GlobalResponse<PointResponseDto>> {
    const pointEntity = await this.getPointUseCase.execute({
      userId: userId,
    });

    return GlobalResponse.success({
      statusCode: 200,
      message: '포인트 조회가 완료되었습니다.',
      data: serializationUtils.entityToDto({
        dto: PointResponseDto,
        entity: pointEntity,
      }),
    });
  }
}
