import { api } from "../lib/axios";
import type { PostRequest, PostResponse, PostUpdate } from "../types/post";
import { BaseService } from "./baseService";

class PostService extends BaseService<PostResponse , PostRequest , PostUpdate> {
    private endPoint: string;
    public constructor(endPoint: string) {
        super(endPoint)
        this.endPoint = endPoint;
    }
    public toggleLike(id: number) {
        return api.post(`${this.endPoint}/${id}/like`);
    }
}

export const postService = new PostService("/posts");