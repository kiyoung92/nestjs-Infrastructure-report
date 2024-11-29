import { ApiOperationOptions, ApiResponseOptions } from '@nestjs/swagger';

export interface ISwaggerMethodConfig {
  apiOperation: ApiOperationOptions;
  apiResponse: ApiResponseOptions;
  apiExtraModels?: any[];
}

export interface ISwaggerConfig {
  apiTags: string;
  methods: Record<string, ISwaggerMethodConfig>;
}
