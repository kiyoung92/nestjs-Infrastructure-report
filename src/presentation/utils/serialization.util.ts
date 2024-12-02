import {
  ClassConstructor,
  ClassTransformOptions,
  plainToInstance,
} from 'class-transformer';

export interface serializationUtils {
  dto: <DtoType, ResponseEntity>({
    dto,
    entity,
    options,
  }: serializationDtoParams<DtoType, ResponseEntity>) => DtoType;
}

type serializationDtoParams<DtoType, ResponseEntity> = {
  dto: ClassConstructor<DtoType>;
  entity: ResponseEntity | ResponseEntity[];
  options?: ClassTransformOptions;
};

export const serializationUtils: serializationUtils = Object.freeze({
  dto: <DtoType, ResponseEntity>({
    dto,
    entity,
    options,
  }: serializationDtoParams<DtoType, ResponseEntity>) => {
    return Array.isArray(entity)
      ? plainToInstance<DtoType, ResponseEntity[]>(
          dto,
          entity,
          options
            ? options
            : {
                excludeExtraneousValues: true,
              },
        )
      : plainToInstance<DtoType, ResponseEntity>(
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
