import { api } from "../lib/axios";
import type { ApiResponse } from "../types/api";

export abstract class BaseService<T , C , U> {
    protected endpoint: string;
    protected constructor(endpoint: string) {
        this.endpoint = endpoint;
    }
    getAll() : Promise<ApiResponse<T[]>> {
        return api.get(this.endpoint);
    }
    getById(id: number | string): Promise<ApiResponse<T>> {
        return api.get(`${this.endpoint}/${id}`);
    }
    create(data: C | any): Promise<ApiResponse<T>> {
        return api.post(this.endpoint , data);
    }
    update(id: number | string , data: U): Promise<ApiResponse<T>> {
        return api.put(`${this.endpoint}/${id}` , data);
    }
    delete(id: number): Promise<ApiResponse<null>> {
        return api.delete(`${this.endpoint}/${id}`)
    }
}