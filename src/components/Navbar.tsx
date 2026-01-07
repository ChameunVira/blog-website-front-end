import { Search } from "lucide-react"
import type React from "react"
import p from "../../src/assets/download.png"

const Navbar: React.FC = () => {
    return (
        <header className="sticky top-0 left-0 z-50">
            <nav className="flex app-container justify-between py-3.5 shadow">
                <h1 className="font-semibold cursor-pointer">KH <span className="text-indigo-600">SOCIAL</span></h1>
                <div className="relative w-1/3">
                    <div className="text-slate-800/80 absolute cursor-pointer top-1/2 left-6 -translate-1/2">
                        <Search />
                    </div>
                    <input type="text" className="w-full h-full px-12" placeholder="Search For Creators"/>
                </div>
                <div className="flex gap-4 items-center">
                    <button className="btn">Add Post</button>
                    <div className="rounded-full">
                        <img src={p} alt="" className="profile"/>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar
