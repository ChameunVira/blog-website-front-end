export interface UserRequest {
    username: string,
    email: string,
    password: string 
}

export type AuthRequest = Omit<UserRequest , "username">;

export interface UserResponse extends Omit<UserRequest , "password"> {
    id: number,
    token: string,
    role: Array<string>,
    createdAt: string,
    updatedAt: string
}