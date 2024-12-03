export type GlobalResponseSuccessParams<ResponseDataType> = {
  statusCode: number;
  message: string;
  data?: ResponseDataType;
};

export type GlobalResponseErrorParams = {
  statusCode: number;
  message: string;
};

export type GlobalResponseSuccessReturnType<ResponseDataType> = {
  status: 'success';
  statusCode: number;
  message: string;
  data?: ResponseDataType;
  timestamp: string;
};

export type GlobalResponseErrorReturnType = {
  status: 'error';
  statusCode: number;
  message: string;
  timestamp: string;
};
