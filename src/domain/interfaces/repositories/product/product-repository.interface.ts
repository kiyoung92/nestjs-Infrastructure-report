type ProductRepositoryFindManyReturnType = {
  total: {
    count: number;
  }[];
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
};

type ProductRepositoryFindTopSalesReturnType = {
  id: number;
  storeId: number;
  name: string;
  price: number;
  salesVolume: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};

export interface IProductRepository {
  findMany(
    offset: number,
    limit: number,
    sort: string,
    keyword?: string,
  ): Promise<ProductRepositoryFindManyReturnType>;
  findTopSales(): Promise<ProductRepositoryFindTopSalesReturnType[]>;
}
