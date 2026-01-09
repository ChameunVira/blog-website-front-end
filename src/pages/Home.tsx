import { useContext, useEffect, useState } from "react"
import { postService } from "../service/PostService";
import { toast } from "react-toastify";
import type { PostResponse } from "../types/post";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import PostCard from "../components/PostCard";
import Profile from "../components/Profile";
import { AppContextProvider } from "../context/AppContext";
import { Mosaic } from "react-loading-indicators";
import PostModel from "../components/PostModel";

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
            <Navbar />
            <section className="flex gap-4 app-container pt-4">
                <aside className="w-72 flex flex-col items-center p-4 pl-0 gap-y-4">
                    {/* profile */}
                    <Profile />
                    {/* side bar all item list */}
                    <Sidebar />
                </aside>
                {/* post content area */}
                <div className="flex-1 h-screen p-4 justify-center overflow-y-scroll flex-col">
                    <div className="relative w-full mb-4">
                        <img src={`${import.meta.env.VITE_API_URL}/images/${userProfile?.profile}`} alt="" className="profile ring-0 w-8 h-8 absolute top-1/2 left-2 -translate-y-1/2" />
                        <input className="w-full h-full py-2 px-14" type="text" placeholder="What's is on your mind?" />
                        <button
                            onClick={() => setIsPostModelOpen(!isPostModelOpen)}
                            className="absolute top-1/2 right-2 -translate-y-1/2 btn py-1 px-4">
                            Post
                        </button>
                    </div>
                    <div className="w-full h-auto">
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
                    </div>
                </div>
                <div className="w-72 p-4 pr-0">
                    <h2>For sponsor on this place here.</h2>
                </div>
            </section>
            {isPostModelOpen && <PostModel/>}
        </main>
    )
}

export default Home
