import { Bell, Home, MessageCircleMore, Settings } from "lucide-react"
import { useContext, type ReactElement } from "react"
import type React from "react"
import { AppContextProvider } from "../context/AppContext"
import { Link } from "react-router-dom"

type Items = {
    icon: ReactElement,
    title: string,
    path: string
}
const items: Items[] = [
    {
        icon: <Home size={25} />,
        title: "Home",
        path: ""
    },
    {
        icon: <Bell size={25} />,
        title: "Notifications",
        path: ""
    },
    {
        icon: <MessageCircleMore size={25} />,
        title: "Message",
        path: ""
    },
    {
        icon: <Settings size={25} />,
        title: "Settings",
        path: ""
    }
]

const Sidebar: React.FC = () => {

    const { isPostModelOpen, setIsPostModelOpen } = useContext<any>(AppContextProvider);
    const handlePost = () => {
        setIsPostModelOpen(!isPostModelOpen);
    }

    return (
        <>
            <div className="w-full flex flex-col py-2 bg-zinc-50 rounded-xl shadow-sm">
                {items.map((item, i) => (
                    <Link key={i} to={item.path}>
                           <div className="flex mb-1 gap-4 w-full group items-center py-4 hover:text-linear hover:border-l-6 hover:border-indigo-500/90 hover:border-solid  bg-linear-to-r hover:from-indigo-200 hover:to-transparent transition-all duration-75 cursor-pointer">
                            <div className="text-slate-600 ml-4 group-hover:text-slate-800 transition-colors duration-75">
                                {item.icon}
                            </div>
                            <h3 className="text-[1rem] font-medium">{item.title}</h3>
                        </div>
                    </Link>
                ))}
            </div>
            <div
                onClick={handlePost}
                className="btn w-full py-3.5 text-center">
                Create Post
            </div>
        </>
    )
}

export default Sidebar
