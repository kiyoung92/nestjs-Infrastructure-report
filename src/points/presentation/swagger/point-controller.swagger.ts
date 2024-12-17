import { ISwaggerConfig } from 'src/common/swaggers/interfaces/swagger-config.interface';
import { chargPointControllerSwaggerConfig } from 'src/points/presentation/swagger/charge-point-controller.swagger';
import { getPointControllerSwaggerConfig } from 'src/points/presentation/swagger/get-point-controller.swagger';

export const pointSwaggerConfig: ISwaggerConfig = {
  apiTags: 'Point',
  methods: {
    get: getPointControllerSwaggerConfig,
    charge: chargPointControllerSwaggerConfig,
  },
};
