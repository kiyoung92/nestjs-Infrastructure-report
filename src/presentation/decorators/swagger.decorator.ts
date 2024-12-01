import { applyDecorators } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  ISwaggerConfig,
  ISwaggerMethodConfig,
} from 'src/presentation/interface/swagger/swagger-config.interface';

export const SetSwagger = (config: ISwaggerConfig) => {
  return (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    const methodName = propertyKey.toString();
    const methodConfig: ISwaggerMethodConfig = config.methods[methodName];

    if (!methodConfig) {
      throw new Error(`Swagger config not found for method: ${methodName}`);
    }

    applyDecorators(
      ApiTags(config.apiTags),
      ApiOperation(methodConfig.apiOperation),
      ApiResponse(methodConfig.apiResponse),
      ApiExtraModels(...methodConfig.apiExtraModels),
    )(target, propertyKey, descriptor);

    return descriptor;
  };
};
