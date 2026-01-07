import React from 'react'
import p from '../../src/assets/download.png'

const Profile: React.FC = () => {
    return (
        <>
            <div className="w-full flex items-center space-x-2 bg-zinc-50 rounded-xl shadow-sm p-4">
                <img src={p} alt="" className="profile"/>
                <div className="overflow-hidden">
                    <h4 className="text-[1.05rem] font-medium text-slate-800/80">Chamreun Vira</h4>
                    <p className="text-slate-800/50 text-sm truncate">virachamreun@gmail.com</p>
                </div>
            </div>
        </>
    )
}

export default Profile
