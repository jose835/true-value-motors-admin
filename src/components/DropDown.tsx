import { useNavigate } from "react-router-dom";
import { supabase } from "../api/supabase-client";

export default function DropDown() {
    const navigate = useNavigate();

    async function handleLogout() {
        const { error } = await supabase.auth.signOut();
        if (!error) {
            navigate("/login"); // Redirigir al usuario después de cerrar sesión
        }
    }

    return (
        <div className="absolute right-0 mt-2 bg-white border border-gray-300 divide-gray-100 rounded-lg shadow-sm w-44">
            <ul className="py-2 text-sm text-gray-700 font-semibold">
                <li>
                    <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                        Sign out
                    </button>
                </li>
            </ul>
        </div>
    )
}
