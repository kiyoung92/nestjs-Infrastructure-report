import { GlobalResponse } from 'src/common/responses/global-response';
import { PointRequestDto } from 'src/presentation/point/dtos/point-request.dto';
import { PointResponseDto } from 'src/presentation/point/dtos/point-response.dto';

export interface IPointCotroller {
  charge(dto: PointRequestDto): Promise<GlobalResponse<PointResponseDto>>;
  get(userId: number): Promise<GlobalResponse<PointResponseDto>>;
}
