import { api } from "../lib/axios";
import type { ApiResponse } from "../types/api";
import type { AuthRequest, UserRequest, UserResponse } from "../types/auth";

class AuthService {
    private endpoint: string;
    public constructor(endpoint : string) {
        this.endpoint = endpoint;
    }
    public register(data: UserRequest): Promise<ApiResponse<UserResponse>> {
        return api.post(`${this.endpoint}/register` , data);
    }

    public login(data: AuthRequest): Promise<ApiResponse<UserRequest>> {
        return api.post(`${this.endpoint}/login` , data);
    }
}

export const atuhService = new AuthService("/auth");