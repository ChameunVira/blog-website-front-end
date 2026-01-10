import { AlertTriangle, Heart, MessageCircleMore, MoreVertical } from "lucide-react"
import type React from "react"
import type { PostResponse } from "../../types/post";
import { useState } from "react";
import { postService } from "../../service/PostService";
import { toast } from "react-toastify";
import PopupPostComment from "./PopupPostComment";

const PostCard: React.FC<PostResponse> = ({ id, title, content, image, author, comments, like, likeByMe, createdAt, updatedAt }) => {

    const [isLike, setIsLike] = useState<boolean | undefined>(likeByMe);
    const [likeCount, setLikeCount] = useState<number>(like);
    const [comment, setComment] = useState<boolean>(false);

    const handleDeletePost = async (id: number) => {
        try {
            const response = await postService.delete(id);
            if (response.success) {
                toast.success("Post deleted successfully.");
            } else {
                toast.error("You don't have permiss ion to delete this post.");
            }
        } catch (e: any) {
            console.log("Error");
        }
    }

    const handleLike = async (id: any) => {
        const prevIsLike: boolean | undefined = isLike;
        const prevLikeCount: number | undefined = likeCount;
        setLikeCount(prev => prevIsLike ? prev -= 1 : prev += 1);
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
                <div className="flex items-center justify-between">
                    <div className="flex space-x-4">
                        {author.profile.endsWith(".mp4") ? <>
                            <video autoPlay loop muted className="profile object-cover">
                                <source src={`${import.meta.env.VITE_API_URL}/images/${author.profile}`} />
                            </video>
                        </> : <img src={`${import.meta.env.VITE_API_URL}/images/${author.profile}`} alt="" className="profile" />}
                        <div className="leading-5.5">
                            <h4 className="text-800/800 font-semibold">{author?.username}</h4>
                            <p className="text-800/50 text-sm">{updatedAt ? updatedAt : createdAt}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => handleDeletePost(id)}
                        className="rounded-full text-slate-800/90 p-1.5 hover:bg-slate-200/90 transition-colors duration-75">
                        <MoreVertical size={20} />
                    </button>
                </div>
                <div>
                    <h2 className="text-2xl font-medium">{title}</h2>
                    <p className="mt-2 indent-8 leading-5.5">{content}</p>
                </div>
                <div className="h-100 bg-zinc-100 rounded-md overflow-hidden">
                    {image.endsWith(".mp4") ? (
                        <video
                            controls
                            className="w-full h-full object-contain bg-black"
                            preload="metadata"
                        >
                            <source src={`${import.meta.env.VITE_API_URL}/images/${image}`} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    ) : (
                        <img src={`${import.meta.env.VITE_API_URL}/images/${image}`} alt="" className="w-full h-full object-contain hover:scale-105 transition-transform duration-75 cursor-pointer" />
                    )}
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
                    <button
                        onClick={() => setComment(!comment)}
                        className="text-slate-800 flex items-center">
                        <MessageCircleMore size={25} />
                        <p className="text-slate-700/90 ml-2 text-[1.16rem]">{comments?.length}</p>
                    </button>
                    <button className="text-amber-500">
                        <AlertTriangle size={25} />
                    </button>
                </div>
            </div>

            {comment && <PopupPostComment post={{ id, title, content, image, author, like, likeByMe, createdAt, updatedAt }} onClose={() => setComment(false)} />}
        </>
    )
}

export default PostCard
