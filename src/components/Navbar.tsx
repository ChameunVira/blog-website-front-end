import { Search } from "lucide-react"
import type React from "react"
import { useContext, useRef, useState } from "react"
import { AppContextProvider } from "../context/AppContext"
import { Link } from "react-router-dom"
import { atuhService } from "../service/authService"
import { useClickOutside } from "../hooks/useClickOutside"

const Navbar: React.FC = () => {
    const { userProfile, isLoggedIn, setIsLoggedIn } = useContext<any>(AppContextProvider);
    const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false);
    const { isPostModelOpen, setIsPostModelOpen } = useContext<any>(AppContextProvider);
    const dropDownRef = useRef<any>(null);

    useClickOutside(dropDownRef, () => setIsDropDownOpen(false));

    const handleLogout = async () => {
        try {
            const response = await atuhService.logout();
            if (response) {
                setIsLoggedIn(true)
            }
        } catch (e: any) {
            setIsLoggedIn(false);
        }
    }

    const handlePost = () => {
        setIsPostModelOpen(!isPostModelOpen);
    }

    // const handleMouseUp = (e: React.FormEvent) => {
    //     if(!dropDownRef.current === e.target) {
    //         setIsDropDownOpen(false);
    //     }
    // }

    return (
        <header className="sticky top-0 left-0 z-50">
            <nav className="flex app-container justify-between py-3.5 shadow">
                <h1 className="font-semibold cursor-pointer text-xl shrink-0 mr-4">KH <span className="text-indigo-600">SOCIAL</span></h1>
                <div className="relative hidden md:block w-1/3 max-w-md">
                    <div className="text-slate-800/80 absolute cursor-pointer top-1/2 left-4 -translate-y-1/2">
                        <Search size={18} />
                    </div>
                    <input type="text" className="w-full h-10 pl-10 pr-4 bg-zinc-100 border-none rounded-full text-sm focus:ring-2 focus:ring-indigo-500/20" placeholder="Search For Creators" />
                </div>
                {userProfile && isLoggedIn ? (
                    <div className="flex gap-4 items-center">
                        <button
                            onClick={handlePost}
                            className="btn">Add Post</button>
                        <div className="rounded-full relative">
                            <img
                                onClick={() => setIsDropDownOpen(true)}
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
