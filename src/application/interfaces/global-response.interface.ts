import {
  GlobalResponseErrorParams,
  GlobalResponseErrorReturnType,
  GlobalResponseSuccessParams,
  GlobalResponseSuccessReturnType,
} from 'src/application/interfaces/types/global-response.type';

export interface IGlobalResponse {
  readonly success: <ResponseDataType>(
    params: GlobalResponseSuccessParams<ResponseDataType>,
  ) => GlobalResponseSuccessReturnType<ResponseDataType>;
  readonly error: ({
    statusCode,
    message,
  }: GlobalResponseErrorParams) => GlobalResponseErrorReturnType;
}
