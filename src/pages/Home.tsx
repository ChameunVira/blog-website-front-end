import { useEffect, useState } from "react"
import { postService } from "../service/PostService";
import { toast } from "react-toastify";
import type { Posts } from "../types/post";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import PostCard from "../components/PostCard";
import Profile from "../components/Profile";
import p from "../../src/assets/download.png";

const Home = () => {
    const [posts, setPosts] = useState<Posts[]>([]);
    const [loading, setLoading] = useState(false);

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
    }, [])

    if (loading) return "Loading Post wait a minute";

    return (
        <main className="w-full">
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
                        <img src={p} alt="" className="profile ring-0 w-8 h-8 absolute top-1/2 left-2 -translate-y-1/2" />
                        <input className="w-full h-full py-2 px-14" type="text" placeholder="What's is on your mind?" />
                        <button className="absolute top-1/2 right-2 -translate-y-1/2 btn py-1 px-4">
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
                    <p>Sponsor show on this place.</p>
                </div>
            </section>
        </main>
    )
}

export default Home
