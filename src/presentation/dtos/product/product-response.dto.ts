import { Expose } from 'class-transformer';

export class ProductResponseDto {
  @Expose()
  rows: {
    id: number;
    storeId: number;
    name: string;
    price: number;
    salesVolume: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
  }[];

  @Expose()
  totalPage: number;

  @Expose()
  total: number;

  @Expose()
  page: number;

  @Expose()
  limit: number;
}
