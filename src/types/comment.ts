export interface ComemntRequest {
    content: string
}

export interface CommentResponse {
    id: number,
    content: string,
    createAt: string,
    image: string,
    userId: string,
    username: string
}
