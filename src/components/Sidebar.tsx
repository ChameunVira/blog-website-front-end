import { Bell, Home, MessageCircleMore, Settings } from "lucide-react"
import type { ReactElement } from "react"
import type React from "react"

type Items = {
    icon: ReactElement,
    title: string
}
const items: Items[] = [
    {
        icon: <Home size={25} />,
        title: "Home"
    },
    {
        icon: <Bell size={25} />,
        title: "Notifications"
    },
    {
        icon: <MessageCircleMore size={25} />,
        title: "Message"
    },
    {
        icon: <Settings size={25} />,
        title: "Settings"
    }
]

const Sidebar: React.FC = () => {
    return (
        <>
            <div className="w-full flex flex-col py-2 bg-zinc-50 rounded-xl shadow-sm">
                {items.map((item, i) => (
                    <div key={i} className="flex mb-1 gap-4 w-full group items-center py-4 hover:text-linear hover:border-l-6 hover:border-indigo-500/90 hover:border-solid  bg-linear-to-r hover:from-indigo-200 hover:to-transparent transition-all duration-75 cursor-pointer">
                        <div className="text-slate-600 ml-4 group-hover:text-slate-800 transition-colors duration-75">
                            {item.icon}
                        </div>
                        <h3 className="text-[1rem] font-medium">{item.title}</h3>
                    </div>
                ))}
            </div>
            <div className="btn w-full py-3.5 text-center">
                Create Post
            </div>
        </>
    )
}

export default Sidebar
