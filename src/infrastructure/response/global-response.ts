import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  GlobalResponseSuccessParams,
  GlobalResponseSuccessReturnType,
} from 'src/application/types/global-response.type';

export class GlobalResponse<ResponseDataType> {
  @ApiProperty()
  @Expose()
  status: 'success' | 'error';

  @ApiProperty()
  @Expose()
  statusCode: number;

  @ApiProperty()
  @Expose()
  message: string;

  @ApiProperty()
  @Expose()
  data?: ResponseDataType;

  @ApiProperty()
  @Expose()
  timestamp: string;

  static success<ResponseDataType>({
    statusCode,
    message,
    data,
  }: GlobalResponseSuccessParams<ResponseDataType>): GlobalResponseSuccessReturnType<ResponseDataType> {
    const responseTime = new Date().toISOString();

    if (!data) {
      return {
        status: 'success',
        statusCode,
        message,
        timestamp: responseTime,
      };
    }

    return {
      status: 'success',
      statusCode,
      message,
      data,
      timestamp: responseTime,
    };
  }

  static error({
    statusCode,
    message,
  }: {
    statusCode: number;
    message: string;
  }) {
    const responseTime = new Date().toISOString();

    return {
      status: 'error',
      statusCode,
      message,
      timestamp: responseTime,
    };
  }
}
