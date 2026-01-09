import type React from "react"
import { useRef, useState } from "react"
import type { UserRequest } from "../../types/auth"
import { atuhService } from "../../service/authService"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import defaultProfile from "../../../src/assets/default-profile.jpg"
import { Edit } from "lucide-react"

const Register: React.FC = () => {

    const [data, setData] = useState<UserRequest>({
        username: "",
        email: "",
        password: "",
    });
    const [image, setImage] = useState<any>(defaultProfile);
    const uploadImageRef = useRef<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    }

    const handleUploadImage = () => {
        const [file] = uploadImageRef.current?.files;
        const cacheURL = URL.createObjectURL(file);
        setImage(cacheURL);
    }

    const handleRefToFileUplaod = (e: React.FormEvent) => {
        e.preventDefault();
        uploadImageRef.current.click();
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const form = new FormData();
        form.append("username", data.username);
        form.append("email", data.email);
        form.append("profile" , uploadImageRef.current.files[0]);
        form.append("password", data.password);

        try {
            const response = await atuhService.register(form);
            if (response.success) {
                toast.success("Register successfully.")
                navigate("/login")
            }
        } catch (e: any) {
            toast.error("Something went wrong.")
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="w-full h-screen flex justify-center items-center bg-linear-to-br from-slate-200 via-indigo-200 to-slate-200">
            <div className="w-1/3 rounded-2xl shadow-sm bg-zinc-50 p-4">
                <h1 className="text-3xl font-semibold pb-6 text-center bg-clip-text text-transparent bg-linear-to-r from-indigo-500 to-purple-600">Sign Up</h1>
                <div className="mb-4 flex justify-center">
                    <div className="relative">
                        <img src={image} alt="" className="w-24 h-24 rounded-full" />
                        <button onClick={handleRefToFileUplaod} className="absolute -bottom-2.5 -right-2.5 text-slate-950 hover:bg-slate-50/70 rounded-full p-2">
                            <Edit />
                        </button>
                    </div>
                </div>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="mb-2 flex justify-center">
                        <input ref={uploadImageRef} onChange={handleUploadImage} type="file" hidden />
                    </div>
                    <p className="font-medium mb-2 text-[1.12rem] text-slate-800/90">Username</p>
                    <div className="*:w-full *:px-2 *:py-1.5 *:mb-3">
                        <input type="text" placeholder="Username" onChange={handleChange} name="username" value={data.username} required />
                    </div>
                    <p className="font-medium mb-2 text-[1.12rem] text-slate-800/90">Email</p>
                    <div className="*:w-full *:px-2 *:py-1.5 *:mb-3">
                        <input type="email" placeholder="Email" onChange={handleChange} name="email" value={data.email} required />
                    </div>
                    <p className="font-medium mb-2 text-[1.12rem] text-slate-800/90">Password</p>
                    <div className="*:w-full *:px-2 *:py-1.5 *:mb-3">
                        <input type="password" placeholder="Password" onChange={handleChange} name="password" value={data.password} required />
                    </div>
                    <button
                        disabled={loading}
                        type="submit"
                        className="w-full mt-3 btn">
                        {loading ? "loading..." : "Register"}
                    </button>
                    <p className="mt-2 text-slate-800/90">Not registered yet? <span className="text-indigo-500 font-medium cursor-pointer">Create an Account</span></p>
                </form>
            </div>
        </section>
    )
}

export default Register
