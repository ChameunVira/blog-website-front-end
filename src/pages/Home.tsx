import { useEffect, useState } from "react"
import { postService } from "../service/PostService";
import { toast } from "react-toastify";
import type { Posts } from "../types/post";

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
        <section className="w-full h-auto flex space-x-4 bg-linear-to-br from-slate-200 via-indigo-200 to-slate-200">
            <div className="w-80">
                <div className="w-[90%] bg-zinc-50 m-6 rounded-xl shadow-sm p-4">
                    <h2 className="text-2xl font-medium">Profile: </h2>
                    <p>Username: Unknow</p>
                    <p>Email: Unknow</p>
                </div>
            </div>
            <div className="flex-1 h-screen overflow-y-scroll flex-col">
                <div className="w-full h-auto px-2">
                    <div className="sticky top-0 left-0 my-6 z-50 backdrop-blur-3xl rounded-md p-4 ring-1 ring-slate-200/90 bg-[rgba(225,225,255,0.1)]">
                        <h2 className="text-4xl font-semibold bg-linear-to-r from-emerald-500 via-indigo-500 bg-clip-text text-transparent">My Blog List:</h2>
                    </div>
                    {posts.map((item, i) => (
                        <div key={i} className="z-0 bg-zinc-50 shadow rounded-2xl p-4 mb-6">
                            <div className="mb-2 px-1.5 py-0.5 rounded-md backdrop-blur-2xl bg-[rgba(225,225,255,0.03)] ring-1 ring-[rgba(225,225,225,0.6)] inline-block">
                                <h3 className="">Author: <span className="text-sky-500 font-semibold">{item.author?.username}</span></h3>
                            </div>
                            <h1 className="text-indigo-400 text-2xl font-semibold">{item.title}</h1>
                            <p className="text-slate-900/80 mt-2">{item.content}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-80">
            </div>
        </section>
    )
}

export default Home
