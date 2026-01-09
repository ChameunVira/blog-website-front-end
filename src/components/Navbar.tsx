import { Search } from "lucide-react"
import type React from "react"
import { useContext, useRef, useState } from "react"
import { AppContextProvider } from "../context/AppContext"
import { Link } from "react-router-dom"

const Navbar: React.FC = () => {
    const { userProfile, isLoggedIn , setIsLoggedIn } = useContext<any>(AppContextProvider);
    const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false);
    const dropDownRef = useRef<any>(null);

    const handleToggleDropDown = (e: React.FormEvent) => {
        if(e.target !== dropDownRef.current) {
            setIsDropDownOpen(false);
        }
        setIsDropDownOpen(true);
    }


    const handleLogout = () => {
        setIsLoggedIn(false);
    }

    // const handleMouseUp = (e: React.FormEvent) => {
    //     if(!dropDownRef.current === e.target) {
    //         setIsDropDownOpen(false);
    //     }
    // }

    return (
        <header className="sticky top-0 left-0 z-50">
            <nav className="flex app-container justify-between py-3.5 shadow">
                <h1 className="font-semibold cursor-pointer">KH <span className="text-indigo-600">SOCIAL</span></h1>
                <div className="relative w-1/3">
                    <div className="text-slate-800/80 absolute cursor-pointer top-1/2 left-6 -translate-1/2">
                        <Search />
                    </div>
                    <input type="text" className="w-full h-full px-12" placeholder="Search For Creators" />
                </div>
                {userProfile && isLoggedIn ? (
                    <div className="flex gap-4 items-center">
                        <button className="btn">Add Post</button>
                        <div className="rounded-full relative">
                            <img
                                onMouseDown={handleToggleDropDown}
                                onMouseUp={handleToggleDropDown}
                                src={`${import.meta.env.VITE_API_URL}/images/${userProfile?.profile}`} alt="Avata" className="profile" />
                            {isDropDownOpen && (
                                <div
                                    ref={dropDownRef}
                                    className="absolute left-0 shadow-sm rounded-md bg-zinc-50 px-2.5 py-1">
                                    <button 
                                    onClick={handleLogout}
                                    className="btn bg-rose-500 text-white">Logout</button>
                                </div>
                            )}
                        </div>
                    </div>
                ) :
                    (<Link to="/login">
                        <button className="btn">
                            Login
                        </button>
                    </Link>)}
            </nav>
        </header>
    )
}
export default Navbar
