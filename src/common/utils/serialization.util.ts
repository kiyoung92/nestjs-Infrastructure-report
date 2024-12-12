import {
  ClassConstructor,
  ClassTransformOptions,
  plainToInstance,
} from 'class-transformer';

export interface serializationUtils {
  entityToDto: <DtoType, ResponseEntity>({
    dto,
    entity,
    options,
  }: serializationDtoParams<DtoType, ResponseEntity>) => DtoType;
}

type serializationDtoParams<DtoType, ResponseEntity> = {
  dto: ClassConstructor<DtoType>;
  entity: ResponseEntity;
  options?: ClassTransformOptions;
};

export const serializationUtils: serializationUtils = Object.freeze({
  entityToDto: <DtoType, ResponseEntity>({
    dto,
    entity,
    options,
  }: serializationDtoParams<DtoType, ResponseEntity>) => {
    return plainToInstance<DtoType, ResponseEntity>(
      dto,
      entity,
      options
        ? options
        : {
            excludeExtraneousValues: true,
          },
    );
  },
});
