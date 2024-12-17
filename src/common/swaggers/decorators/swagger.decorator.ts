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
} from 'src/common/swaggers/interfaces/swagger-config.interface';

export const SetOpenAPI = (config: ISwaggerConfig) => {
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

    const apiResponses = Array.isArray(methodConfig.apiResponse)
      ? methodConfig.apiResponse
      : [methodConfig.apiResponse];

    const decorators = [
      ApiTags(config.apiTags),
      ApiOperation(methodConfig.apiOperation),
      ...apiResponses.map((response) => ApiResponse(response)),
    ];

    if (methodConfig.apiExtraModels && methodConfig.apiExtraModels.length > 0) {
      decorators.push(ApiExtraModels(...methodConfig.apiExtraModels));
    }

    applyDecorators(...decorators)(target, propertyKey, descriptor);

    return descriptor;
  };
};
