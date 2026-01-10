import type React from "react"
import { X, Send } from "lucide-react"
import type { PostResponse } from "../../types/post";
import { useEffect, useState } from "react";
import type { ComemntRequest, CommentResponse } from "../../types/comment";
import { commentService } from "../../service/commentService";

interface PopupPostProps {
    post: PostResponse;
    onClose: () => void;
}

const PopupPostComment: React.FC<PopupPostProps> = ({ post, onClose }) => {
    const { id, title, content, image, author, createdAt, updatedAt } = post;
    const apiUrl = import.meta.env.VITE_API_URL;

    const [data, setData] = useState<ComemntRequest>({
        content: "",
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [comments, setComments] = useState<CommentResponse[]>([]);

    const handlePostComment = async () => {
        try {
            setIsLoading(true);
            const response = await commentService.comment(id, data);
            if (response.success) {
                handleFetchComment(id);
            }

        } catch (e: any) {
            console.log("error");
        } finally {
            setIsLoading(false);
        }
    }

    const handleFetchComment = async (id: number) => {
        const response = await commentService.allComment(id);
        if (response.success) {
            setComments(response.data);
        }
    }

    useEffect(() => {
        handleFetchComment(id);
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            {/* Backdrop click to close */}
            <div className="absolute inset-0" onClick={onClose}></div>

            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col relative z-10 animate-in zoom-in-95 duration-200">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 bg-black/5 hover:bg-black/10 rounded-full text-zinc-600 transition-colors z-20 backdrop-blur-md"
                >
                    <X size={20} />
                </button>
                {/* Scrollable Content */}
                <div className="overflow-y-auto flex-1 custom-scrollbar">
                    {image && (
                        <div className="w-full bg-zinc-50 border-b border-zinc-100">
                            {image.endsWith('.mp4') ? (
                                <video controls autoPlay className="w-full max-h-[50vh] object-contain mx-auto">
                                    <source src={`${apiUrl}/images/${image}`} type="video/mp4" />
                                </video>
                            ) : (
                                <img
                                    src={`${apiUrl}/images/${image}`}
                                    alt={title}
                                    className="w-full max-h-[50vh] object-contain mx-auto"
                                />
                            )}
                        </div>
                    )}

                    <div className="p-6">
                        {/* Author Info */}
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-12 h-12 rounded-full overflow-hidden bg-zinc-200 shrink-0 border border-zinc-100">
                                {author.profile && author.profile.endsWith('.mp4') ? (
                                    <video autoPlay loop muted className="w-full h-full object-cover">
                                        <source src={`${apiUrl}/images/${author.profile}`} />
                                    </video>
                                ) : (
                                    <img
                                        src={`${apiUrl}/images/${author.profile}`}
                                        alt={author.username}
                                        className="w-full h-full object-cover"
                                    />
                                )}
                            </div>
                            <div>
                                <h3 className="font-semibold text-zinc-900 leading-tight">{author.username}</h3>
                                <p className="text-xs text-zinc-500 mt-0.5">{updatedAt || createdAt}</p>
                            </div>
                        </div>

                        {/* Title & Content */}
                        <h2 className="text-2xl font-bold text-zinc-900 mb-3">{title}</h2>
                        <div className="text-zinc-700 leading-relaxed whitespace-pre-wrap mb-8 text-[0.95rem]">
                            {content}
                        </div>

                        <div className="border-t border-zinc-100 my-6"></div>

                        {/* Comments Section */}
                        <div className="space-y-6">
                            <h3 className="font-semibold text-zinc-900 flex items-center">
                                Comments
                                <span className="ml-2 px-2 py-0.5 bg-zinc-100 text-zinc-600 rounded-full text-xs font-medium">
                                    {comments?.length || 0}
                                </span>
                            </h3>

                            <div className="space-y-5">
                                {comments && comments.length > 0 ? (
                                    comments.map((comment) => (
                                        <div key={comment.id} className="flex space-x-3">
                                            {/* Avatar Placeholder for commenter */}
                                            <div className="w-8 h-8 ring-1 ring-indigo-500 shrink-0 rounded-full overflow-hidden">
                                                <img src={`${apiUrl}/images/${comment.image}`} className="object-cover" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="bg-zinc-50 p-3 rounded-2xl rounded-tl-none">
                                                    <div className="flex justify-between items-baseline mb-1">
                                                        <span className="font-semibold text-sm text-zinc-900">{comment.username}</span>
                                                    </div>
                                                    <p className="text-sm text-zinc-700 leading-relaxed">{comment.content}</p>
                                                </div>
                                                <div className="mt-1 ml-2">
                                                    <span className="text-[10px] text-zinc-400 font-medium">{comment.createAt}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-10 bg-zinc-50/50 rounded-xl border border-dashed border-zinc-200">
                                        <p className="text-zinc-400 text-sm">No comments yet.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Comment Input Footer */}
                <div className="p-4 border-t border-zinc-100 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.02)]">
                    <div className="flex space-x-3">
                        <div className="flex-1 relative">
                            <input
                                onChange={(e) => setData({ content: e.target.value })}
                                type="text"
                                placeholder="Add a comment..."
                                className="w-full bg-zinc-50 border-transparent hover:bg-zinc-100 focus:bg-white focus:border-indigo-500/30 focus:ring-4 focus:ring-indigo-500/10 rounded-xl px-4 py-3 text-sm outline-none transition-all placeholder:text-zinc-400"
                            />
                        </div>
                        <button
                            onClick={handlePostComment}
                            className="px-4 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl transition-colors flex items-center justify-center shrink-0 font-medium text-sm">
                            Post <Send size={16} className="ml-2" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PopupPostComment
