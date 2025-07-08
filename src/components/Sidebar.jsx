import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Sidebar() {
    const { logout } = useAuth();

    return (
        <div className="fixed left-0 top-0 h-screen w-64 bg-white shadow-lg z-50">
            <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-8">Recipe Swiper</h1>
                
                <nav className="space-y-4">
                    <Link 
                        to="/" 
                        className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-100"
                    >
                        Home
                    </Link>
                    <Link 
                        to="/liked" 
                        className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-100"
                    >
                        Liked Recipes
                    </Link>
                    <Link 
                        to="/my-recipes" 
                        className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-100"
                    >
                        My Recipes
                    </Link>
                    <Link 
                        to="/create" 
                        className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-100"
                    >
                        Create Recipe
                    </Link>
                </nav>

                <button 
                    onClick={logout}
                    className="mt-8 w-full py-2.5 px-4 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition duration-200"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Sidebar; 