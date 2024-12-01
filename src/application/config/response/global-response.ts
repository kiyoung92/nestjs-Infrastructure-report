import { ApiProperty } from '@nestjs/swagger';
import {
  GlobalResponseSuccessParams,
  GlobalResponseSuccessReturnType,
} from 'src/application/types/global-response.type';

export class GlobalResponse<ResponseDataType> {
  @ApiProperty()
  status: 'success' | 'error';

  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  data?: ResponseDataType;

  @ApiProperty()
  timestamp: string;

  public static success<ResponseDataType>({
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

  public static error({
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
