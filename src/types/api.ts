export interface ApiSuccess<T> {
    success: boolean,
    message: string,
    data: T,
    timestamp: Date
};

export type ApiError = Omit<ApiSuccess<any> , "data">;

export type ApiResponse<T> = ApiSuccess<T>;