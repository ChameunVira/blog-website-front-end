import React, { useContext, useState } from "react"
import type { PostRequest } from "../types/post"
import { X } from "lucide-react"
import { AppContextProvider } from "../context/AppContext"
import FileDropzone from "./FileDropzone"

const PostModel: React.FC = () => {

  const [data, setData] = useState<PostRequest>({
    title: "",
    content: "",
  });
  const { isPostModelOpen, setIsPostModelOpen } = useContext<any>(AppContextProvider);
  const handleUploadImage = () => {

  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  }

  const handleSubmit = (e: React.FormEvent) => {

  }

  return (
    <section className="w-full h-screen fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center">
      <div className="w-1/2 relative rounded-2xl shadow-sm bg-zinc-50 p-6">
        <div className="flex justify-between items-center">
          <h1 className="mb-4 text-indigo-500">Post</h1>
          <button
            onClick={() => setIsPostModelOpen(!isPostModelOpen)}
            className="cursor-pointer p-1.5 rounded-full hover:bg-slate-200/90">
            <X size={28} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <p className="font-medium mb-2 text-[1.12rem] text-slate-800/90">Title</p>
          <div className="*:w-full *:px-2 *:py-1.5 *:mb-3">
            <input type="text" placeholder="Title" onChange={handleChange} name="title" value={data.title} required />
          </div>
          <p className="font-medium mb-2 text-[1.12rem] text-slate-800/90">Content</p>
          <textarea name="content" placeholder="What's is on your mind..." onChange={handleChange} value={data.content} required className="w-full px-2 py-1.5 mb-3 resize-none rounded-md border border-slate-200/90 transition-colors duration-75"></textarea>
          <div className="mb-2">
            <FileDropzone />
          </div>
          <button className="mt-2 btn w-full">
            Post
          </button>
        </form>
      </div>
    </section>
  )
}

export default PostModel
