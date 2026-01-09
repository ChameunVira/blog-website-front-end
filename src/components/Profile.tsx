import React, { useContext } from 'react'
import { AppContextProvider } from '../context/AppContext';

const Profile: React.FC = () => {
    const {userProfile} = useContext<any>(AppContextProvider);
    return (
        <>
            <div className="w-full flex items-center space-x-2 bg-zinc-50 rounded-xl shadow-sm p-4">
                <img src={`${import.meta.env.VITE_API_URL}/images/${userProfile?.profile}`} alt="" className="profile"/>
                <div className="overflow-hidden">
                    <h4 className="text-[1.05rem] font-medium text-slate-800/80">{userProfile?.username}</h4>
                    <p className="text-slate-800/50 text-sm truncate">{userProfile?.email}</p>
                </div>
            </div>
        </>
    )
}

export default Profile
