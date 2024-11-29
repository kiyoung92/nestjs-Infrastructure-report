import { Injectable } from '@nestjs/common';
import { IProductService } from 'src/domain/interfaces/product-service.interface';

@Injectable()
export class ProductService implements IProductService {
  async findAll() {
    return [
      {
        id: 1,
        name: '상품명',
        price: 10000,
        salesVolume: 100,
        createdAt: '2021-01-01 00:00:00.111',
        updatedAt: '2021-01-01 00:00:00.111',
      },
    ];
  }

  async findOne(id: number) {
    return {
      id: 1,
      name: '상품명',
      price: 10000,
      salesVolume: 100,
      createdAt: '2021-01-01 00:00:00.111',
      updatedAt: '2021-01-01 00:00:00.111',
    };
  }

  async findTopSales() {
    return [
      {
        id: 1,
        name: '상품명',
        price: 10000,
        salesVolume: 100,
        createdAt: '2021-01-01 00:00:00.111',
        updatedAt: '2021-01-01 00:00:00.111',
      },
    ];
  }
}
