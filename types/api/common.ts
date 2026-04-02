export type ApiListResponse<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
};

export type ApiSingleResponse<T> = {
  data: T;
  message?: string;
};
