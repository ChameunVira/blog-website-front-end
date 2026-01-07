interface CommentResponse {
    id: number,
    content: string,
    createAt: string,
    userId: number,
    username: string
}

export interface PostResponse {
    id: number,
    title: string,
    content: string,
    author: {
        userId: number,
        username: string
    },
    comments?: CommentResponse[],
    like: number,
    likeByMe: boolean
    createdAt: string,
    updatedAt: string
};



export type Posts = Partial<PostResponse>;

export type PostRequest = Pick<PostResponse , "title" | "content">;

export type PostUpdate = Partial<PostRequest>;