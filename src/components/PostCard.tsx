import { AlertTriangle, Heart, MessageCircleMore } from "lucide-react"
import type React from "react"
import p from "../../src/assets/s-hunsen.jpg"
import type { PostResponse } from "../types/post";
import { useState } from "react";
import { postService } from "../service/PostService";

const PostCard: React.FC<PostResponse> = ({ id, title, content, image, author, comments, like, likeByMe, createdAt, updatedAt }) => {

    const [isLike , setIsLike] = useState<boolean | undefined>(likeByMe);
    const [likeCount , setLikeCount] = useState<number>(like);

    const handleLike = async (id: any) => {
        const prevIsLike: boolean | undefined = isLike;
        const prevLikeCount: number | undefined = likeCount;
        setLikeCount(prev => !prevIsLike ? prev += 1 : prev -= 1);
        setIsLike(!isLike);
        try {
            postService.toggleLike(id);
        } catch (e) {
            setIsLike(prevIsLike);
            setLikeCount(prevLikeCount);
            console.log(e);
        }
    }

    return (
        <>
            <div className="w-full felx flex-col *:mb-4 z-0 bg-zinc-50 shadow rounded-2xl p-6 mb-4">
                <div className="flex items-center space-x-2">
                    <img src={p} alt="" className="profile" />
                    <div>
                        <h4 className="text-800/800 font-semibold">{author?.username}</h4>
                        <p className="text-800/50 text-sm">{updatedAt ? updatedAt : createdAt}</p>
                    </div>
                </div>
                <div>
                    <h2 className="text-2xl font-medium">{title}</h2>
                    <p className="mt-2 indent-8 leading-5.5">{content}</p>
                </div>
                <div className="h-100 bg-zinc-100 rounded-md overflow-hidden">
                    <img src={`${import.meta.env.VITE_API_URL}/images/${image}`} alt="" className="w-full h-full object-contain hover:scale-105 transition-transform duration-75 cursor-pointer" />
                </div>
                <div
                    className="flex justify-between items-center"
                    style={{
                        margin: 0
                    }}>
                    <button
                        onClick={() => handleLike(id)}
                        className={`${isLike ? "text-rose-500" : "text-slate-800"} flex items-center`}>
                        <Heart size={25} />
                        <p className="text-slate-700/90 ml-2 text-[1.16rem]">{likeCount}</p>
                    </button>
                    <button className="text-slate-800 flex items-center">
                        <MessageCircleMore size={25} />
                        <p className="text-slate-700/90 ml-2 text-[1.16rem]">{comments?.length}</p>
                    </button>
                    <button className="text-amber-500">
                        <AlertTriangle size={25} />
                    </button>
                </div>
            </div>
        </>
    )
}

export default PostCard
