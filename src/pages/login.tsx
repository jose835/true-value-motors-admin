import { FormEvent, useState } from 'react'
import FieldInput from '../components/FieldInput'
import StatusTags from '../components/StatusTags'
import { Eye } from '../icons/icons'
import { Navigate, useNavigate } from 'react-router-dom';
import { supabase } from '../api/supabase-client';
import { showToast } from '../components/Toast';
import { Toaster } from 'react-hot-toast';
import { useAuth } from '../api/auth-provider';

export default function Login() {
    const navigate = useNavigate();
    const [isFocused, setIsFocused] = useState(false);
    const [isPassword, setIsPassword] = useState(true);
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    function handleChangeUser(name: keyof typeof credentials, value: string) {
        setCredentials({ ...credentials, [name]: value });
    }

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();

        const { data, error } = await supabase.auth.signInWithPassword({
            email: credentials.email,
            password: credentials.password,
        });

        if (error) {
            showToast(error.message, false);
        } else {
            showToast('Login Successful', true);
            navigate('/home');
        }
    };

    // Renombramos `user` para evitar conflictos
    const { user: authUser } = useAuth();

    if (authUser) return <Navigate to="/home" replace />;

    return (
        <>
            <Toaster />
            <div className="h-screen w-screen py-0 flex items-center justify-center">
                <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />

                <section className="text-primary sm:w-[450px] sm:h-auto size-full p-8 rounded-lg bg-white">
                    <header className="flex items-center justify-between">
                        <h1 className="text-primary font-bold text-xl">{import.meta.env.VITE_COMPANY_NAME}</h1>
                        <StatusTags text="Administrativo" status />
                    </header>

                    <main className="mt-10">
                        <h2 className="text-primary text-2xl font-bold">Welcome</h2>
                        <p className="font-medium text-whiting">Login to access the system</p>

                        <form onSubmit={handleLogin} className="mt-3">
                            <FieldInput
                                onChange={(e) => handleChangeUser("email", e.target.value)}
                                className="mt-8"
                                name="Email Address"
                                id="email"
                            />

                            <div className="mt-3">
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-primary">Password</label>
                                <div
                                    className={`bg-gray-50 border rounded-lg flex justify-between items-center px-3 py-1 h-10 w-full ${isFocused ? 'border-blue-500' : 'border-gray-600'}`}
                                    onFocus={() => setIsFocused(true)}
                                    onBlur={() => setIsFocused(false)}
                                >
                                    <input
                                        id="password"
                                        type={isPassword ? "password" : "text"}
                                        onChange={(e) => handleChangeUser("password", e.target.value)}
                                        required
                                        className="bg-gray-50 outline-none text-sm font-medium placeholder-primary w-full text-primary h-full"
                                    />

                                    <button type="button" onClick={() => setIsPassword(!isPassword)}>
                                        <Eye className="size-[22px] text-secondary/80" />
                                    </button>
                                </div>
                            </div>

                            <button type="submit" className="bg-primary rounded-lg text-white shadow-lg text-[15px] w-full mt-8 py-3 border-gray-300 border">
                                Iniciar sesión
                            </button>

                            <div className="w-full text-center mt-5">
                                <span className="text-seconda font-semibold text-sm inline-block">
                                    Forgot your password? <span className="text-[#005bd3] cursor-pointer hover:underline">Change It</span>
                                </span>
                            </div>
                        </form>
                    </main>
                </section>
            </div>
        </>
    );
}
