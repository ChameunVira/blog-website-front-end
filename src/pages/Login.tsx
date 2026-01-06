import type React from "react"
import { useState } from "react"
import type { AuthRequest } from "../types/auth"
import { atuhService } from "../service/authService"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const Login: React.FC = () => {

    const [data, setData] = useState<AuthRequest>({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await atuhService.login(data);
            if (response.success) {
                toast.success("Login successfully.")
                navigate("/")
            }
        } catch (e: any) {
            console.log(e.message);
            toast.error("Something went wrong.")
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="w-full h-screen flex justify-center items-center bg-linear-to-br from-slate-200 via-indigo-200 to-slate-200">
            <div className="w-1/3 rounded-2xl shadow-sm bg-zinc-100 p-4">
                <h1 className="text-3xl font-semibold pb-6 text-center bg-clip-text text-transparent bg-linear-to-r from-indigo-500 to-purple-600">Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <p className="font-medium mb-2 text-[1.12rem] text-slate-800/90">Email</p>
                    <div className="*:rounded-md *:px-2 *:py-1.5 *:mb-3 *:text-slate-900 *:ring-1 *:ring-slate-400 *:block *:w-full *:focus:outline-2 *:focus:outline-slate-700/70 *:focus:outline-solid transition-colors">
                        <input type="email" placeholder="Email" onChange={handleChange} name="email" value={data.email} required/>
                    </div>
                    <p className="font-medium mb-2 text-[1.12rem] text-slate-800/90">Password</p>
                    <div className="*:rounded-md *:px-2 *:py-1.5 *:mb-3 *:text-slate-900 *:ring-1 *:ring-slate-400 *:block *:w-full *:focus:outline-2 *:focus:outline-slate-700/70 *:focus:outline-solid">
                        <input type="password" placeholder="Password" onChange={handleChange} name="password" value={data.password} required/>
                    </div>
                    <button
                        disabled={loading}
                        type="submit"
                        className="w-full mt-3 rounded-md font-semibold px-2.5 py-2 bg-white text-slate-900 hover:bg-slate-900 hover:text-white ring-1 ring-slate-900 transition-colors cursor-pointer">
                        {loading ? "loading..." : "Login"}
                    </button>
                    <p className="mt-2 text-slate-800/90">Not registered yet? <span className="text-indigo-500 font-medium cursor-pointer">Create an Account</span></p>
                </form>
            </div>
        </section>
    )
}

export default Login
