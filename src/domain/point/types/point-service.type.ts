export type PointServiceFindEntityParamsType = {
  pointRepositoryRows: {
    id: number;
    userId: number;
    point: number;
    updatedAt: string;
  }[];
};

export type PointServiceChargeParamsType = {
  pointRepositoryRows: {
    id: number;
    userId: number;
    point: number;
    updatedAt: string;
  }[];
  point: number;
};
