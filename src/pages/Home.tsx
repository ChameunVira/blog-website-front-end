import { useContext, useEffect, useState } from "react"
import { postService } from "../service/PostService";
import { toast } from "react-toastify";
import type { PostResponse } from "../types/post";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import PostCard from "../components/posts/PostCard";
import Profile from "../components/Profile";
import { AppContextProvider } from "../context/AppContext";
import { Mosaic } from "react-loading-indicators";
import PostModelPost from "../components/posts/PostModelPosts";

const Home = () => {
    const [posts, setPosts] = useState<PostResponse[]>([]);
    const [loading, setLoading] = useState(false);
    const { userProfile, isPostModelOpen, setIsPostModelOpen } = useContext<any>(AppContextProvider);
    const handleFetchPost = async () => {
        setLoading(true);
        try {
            const response = await postService.getAll();
            if (response.success) {
                setPosts(response.data);
            }
        } catch (e: any) {
            toast.error(e.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const controller = new AbortController();
        handleFetchPost();
        return controller.abort();
    }, []);

    return (
        <main className="w-full h-auto relative">
            <div className={`${loading && ('fixed inset-0 z-50 bg-black/40 w-full h-screen flex justify-center items-center')}`}>
                {loading && (<Mosaic color="#3e59f8" size="large" text="" textColor="" />)}
            </div>
            <div className="w-full">
                <Navbar />
                <section className="flex justify-center gap-6 app-container pt-6 pb-10">
                    {/* Left Sidebar - Hidden on Mobile/Tablet */}
                    <aside className="hidden lg:flex w-72 flex-col gap-y-6 sticky top-24 h-fit shrink-0">
                        {/* profile */}
                        <Profile />
                        {/* side bar all item list */}
                        <Sidebar />
                    </aside>

                    {/* Main Content Area */}
                    <div className="flex-1 max-w-2xl w-full mx-auto flex flex-col gap-6">
                        {/* Create Post Widget */}
                        <div className="w-full bg-white rounded-2xl shadow-sm border border-zinc-100 p-4 space-y-3">
                            <div className="flex items-center gap-3">
                                <img
                                    src={`${import.meta.env.VITE_API_URL}/images/${userProfile?.profile}`}
                                    alt="Profile"
                                    className="w-10 h-10 rounded-full object-cover border border-zinc-100"
                                />
                                <div
                                    onClick={() => setIsPostModelOpen(true)}
                                    className="flex-1 bg-zinc-100 hover:bg-zinc-200/70 transition-colors rounded-full px-4 py-2.5 cursor-pointer text-zinc-500 text-sm font-medium"
                                >
                                    What is on your mind, {userProfile?.username}?
                                </div>
                            </div>
                            <div className="flex justify-between items-center pt-2 border-t border-zinc-50">
                                <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-zinc-50 text-zinc-600 text-sm font-medium transition-colors">
                                    <span className="text-xl">🖼️</span> Photo/Video
                                </button>
                                <button
                                    onClick={() => setIsPostModelOpen(true)}
                                    className="bg-zinc-900 hover:bg-zinc-800 text-white px-6 py-1.5 rounded-lg font-medium text-sm transition-all"
                                >
                                    Post
                                </button>
                            </div>
                        </div>

                        {/* Posts Feed */}
                        <div className="flex flex-col gap-4">
                            {posts.map((item, i) => (
                                <PostCard
                                    key={i}
                                    id={item.id}
                                    title={item.title}
                                    content={item.content}
                                    image={item.image}
                                    author={item.author}
                                    comments={item.comments}
                                    like={item.like}
                                    likeByMe={item.likeByMe}
                                    createdAt={item.updatedAt}
                                    updatedAt={item.updatedAt}
                                />
                            ))}
                            {posts.length === 0 && !loading && (
                                <div className="text-center py-20">
                                    <p className="text-zinc-400">No posts yet. Be the first to post!</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Sidebar - Sponsor/Extras */}
                    <div className="hidden xl:block w-80 sticky top-24 h-fit shrink-0">
                        <div className="bg-zinc-50 rounded-2xl p-6 border border-zinc-100 text-center">
                            <p className="text-zinc-400 text-sm font-medium mb-2">Sponsored</p>
                            <div className="w-full aspect-video bg-zinc-200 rounded-lg mb-3"></div>
                            <h3 className="font-semibold text-zinc-800">Amazing Product</h3>
                            <p className="text-xs text-zinc-500 mt-1">Check out this incredible thing that will change your life.</p>
                        </div>

                        <div className="mt-4 text-xs text-zinc-400 text-center">
                            &copy; 2026 KH SOCIAL. All rights reserved.
                        </div>
                    </div>
                </section>
            </div>
            {isPostModelOpen && <PostModelPost onPostCreated={handleFetchPost} />}
        </main>
    )
}

export default Home
