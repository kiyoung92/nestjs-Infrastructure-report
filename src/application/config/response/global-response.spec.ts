import { GlobalResponse } from 'src/application/config/response/global-response';

describe('GlobalResponse', () => {
  type SuccessReturnDateType = {
    id: number;
    name: string;
    addr: string;
  };

  it('success with data', () => {
    const result = GlobalResponse.success<SuccessReturnDateType>({
      statusCode: 200,
      message: 'message',
      data: {
        id: 1,
        name: 'name',
        addr: 'addr',
      },
    });

    expect(result).toEqual(
      expect.objectContaining({
        status: 'success',
        statusCode: 200,
        message: 'message',
        data: {
          id: 1,
          name: 'name',
          addr: 'addr',
        },
      }),
    );

    expect(result.timestamp).toEqual(expect.any(String));
    expect(new Date(result.timestamp)).not.toBeNaN();
  });

  it('success without data', () => {
    const result = GlobalResponse.success<SuccessReturnDateType>({
      statusCode: 200,
      message: 'message',
    });

    expect(result).toEqual(
      expect.objectContaining({
        status: 'success',
        statusCode: 200,
        message: 'message',
      }),
    );

    expect(result.timestamp).toEqual(expect.any(String));
    expect(new Date(result.timestamp)).not.toBeNaN();
  });

  it('error', () => {
    const result = GlobalResponse.error({
      statusCode: 500,
      message: 'error message',
    });

    expect(result).toEqual(
      expect.objectContaining({
        status: 'error',
        statusCode: 500,
        message: 'error message',
      }),
    );

    expect(result.timestamp).toEqual(expect.any(String));
    expect(new Date(result.timestamp)).not.toBeNaN();
  });
});
