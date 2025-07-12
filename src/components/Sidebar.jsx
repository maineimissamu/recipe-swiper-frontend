import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { IoClose, IoHome, IoHeart, IoRestaurant, IoAdd, IoLogOut } from 'react-icons/io5';
import { GiCookingPot } from 'react-icons/gi';

function Sidebar({ isOpen, toggleSidebar }) {
    const { logout } = useAuth();

    return (
        <>
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={toggleSidebar}
                ></div>
            )}
            
            <div className={`
                fixed left-0 top-0 h-screen w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                lg:translate-x-0
            `}>
                <div className="p-6">
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                            <GiCookingPot className="text-red-500" />
                            Recipe Swiper
                        </h1>
                        <button 
                            onClick={toggleSidebar}
                            className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
                        >
                            <IoClose className="text-2xl text-gray-600" />
                        </button>
                    </div>
                    
                    <nav className="space-y-4">
                        <Link 
                            to="/" 
                            className="flex items-center gap-3 py-2.5 px-4 rounded transition duration-200 hover:bg-gray-100"
                            onClick={() => window.innerWidth < 1024 && toggleSidebar()}
                        >
                            <IoHome className="text-xl text-gray-600" />
                            Home
                        </Link>
                        <Link 
                            to="/liked" 
                            className="flex items-center gap-3 py-2.5 px-4 rounded transition duration-200 hover:bg-gray-100"
                            onClick={() => window.innerWidth < 1024 && toggleSidebar()}
                        >
                            <IoHeart className="text-xl text-red-500" />
                            Liked Recipes
                        </Link>
                        <Link 
                            to="/my-recipes" 
                            className="flex items-center gap-3 py-2.5 px-4 rounded transition duration-200 hover:bg-gray-100"
                            onClick={() => window.innerWidth < 1024 && toggleSidebar()}
                        >
                            <IoRestaurant className="text-xl text-gray-600" />
                            My Recipes
                        </Link>
                        <Link 
                            to="/create" 
                            className="flex items-center gap-3 py-2.5 px-4 rounded transition duration-200 hover:bg-gray-100"
                            onClick={() => window.innerWidth < 1024 && toggleSidebar()}
                        >
                            <IoAdd className="text-xl text-green-500" />
                            Create Recipe
                        </Link>
                    </nav>

                    <button 
                        onClick={logout}
                        className="flex items-center justify-center gap-3 mt-8 w-full py-2.5 px-4 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition duration-200"
                    >
                        <IoLogOut className="text-xl" />
                        Logout
                    </button>
                </div>
            </div>
        </>
    );
}

export default Sidebar; 