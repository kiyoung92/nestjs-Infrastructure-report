import { GlobalResponse } from 'src/infrastructure/response/global-response';
import { PointRequestDto } from 'src/presentation/dtos/point/point-request.dto';
import { PointResponseDto } from 'src/presentation/dtos/point/point-response.dto';

export interface IPointCotroller {
  charge(dto: PointRequestDto): Promise<GlobalResponse<PointResponseDto>>;
  get(userId: number): Promise<GlobalResponse<PointResponseDto>>;
}
