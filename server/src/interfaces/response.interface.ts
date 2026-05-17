export interface PaginationMeta {
  total: number;
  page: number;
  pages: number;
  limit: number;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
  pagination?: PaginationMeta;
}

export interface PaginatedResponse<T = unknown> extends ApiResponse<T[]> {
  pagination: PaginationMeta;
}
