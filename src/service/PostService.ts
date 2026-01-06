import type { PostRequest, PostResponse, PostUpdate } from "../types/post";
import { BaseService } from "./baseService";

class PostService extends BaseService<PostResponse , PostRequest , PostUpdate> {
    public constructor() {
        super("/posts")
    }
}

export const postService = new PostService();