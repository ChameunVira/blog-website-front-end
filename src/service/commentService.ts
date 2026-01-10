import { api } from "../lib/axios";
import type { ApiResponse } from "../types/api";
import type { ComemntRequest, CommentResponse } from "../types/comment";
import { BaseService } from "./baseService";

class CommentService
 extends BaseService<CommentResponse , ComemntRequest , ComemntRequest> {
    private endPoint: string;
    public constructor(endPoint: string) {
        super(endPoint);
        this.endPoint = endPoint;
    }
    public comment(postId: number, data: ComemntRequest): Promise<ApiResponse<CommentResponse>> {
        return api.post(`${this.endPoint}/${postId}/comments`, data);
    }
    public allComment(postId: number): Promise<ApiResponse<CommentResponse[]>> {
        return api.get(`${this.endPoint}/${postId}/comments`);
    }
    public override update(id: number | string, data: ComemntRequest): Promise<ApiResponse<CommentResponse>> {
        return api.put(`${this.endPoint}/comments/${id}` , data);
    }
    public override delete(id: number): Promise<ApiResponse<null>> {
        return api.delete(`${this.endPoint}/comments/${id}`);
    }
}

export const commentService = new CommentService("/posts");