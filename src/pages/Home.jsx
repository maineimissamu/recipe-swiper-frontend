import { useAuth } from "../context/AuthContext";
import { getRandomRecipe } from "../services/recipe.service";
import { useState, useEffect } from "react";
import { likeRecipe, dislikeRecipe } from "../services/swipe.service";
import Sidebar from "../components/Sidebar";
import { GiCookingPot, GiCupcake } from 'react-icons/gi';
import { BiTime } from 'react-icons/bi';
import { HiUsers } from 'react-icons/hi';
import { RiBarChart2Fill } from 'react-icons/ri';
import { MdOutlineRamenDining } from 'react-icons/md';
import { IoClose, IoHeart, IoRestaurant, IoMenu } from 'react-icons/io5';
import { useSwipe } from "../utils/useSwipe";

function Home() {
    const [currentRecipe, setCurrentRecipe] = useState(null);
    const [nextRecipe, setNextRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isChanging, setIsChanging] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    
    const [swipeOffset, setSwipeOffset] = useState({ x: 0, rotation: 0, opacity: 1 });

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const fetchRecipe = async () => {
        try {
            const response = await getRandomRecipe();
            return response.recipe;
        } catch(err) {
            console.error('Error fetching recipe:', err);
            return null;
        }
    };

    const preloadNextRecipe = async () => {
        const recipe = await fetchRecipe();
        setNextRecipe(recipe);
    };

    const handleTransition = async (action) => {
        if (isChanging) return;
        
        setIsChanging(true);
        
        try {
            await action();
            
            setCurrentRecipe(nextRecipe);
            setNextRecipe(null);
            
            preloadNextRecipe();
        } catch(err) {
            console.error('Error in transition:', err);
        } finally {
            setIsChanging(false);
        }
    };

    const handleLike = () => handleTransition(async () => {
        if (currentRecipe) {
            await likeRecipe(currentRecipe._id);
        }
    });

    const handleDislike = () => handleTransition(async () => {
        if (currentRecipe) {
            await dislikeRecipe(currentRecipe._id);
        }
    });

    const handleSwiping = (eventData) => {
        const { deltaX } = eventData;
        const maxOffset = 300;
        const rotation = (deltaX / maxOffset) * 30;
        const opacity = Math.max(0.3, 1 - Math.abs(deltaX) / maxOffset);

        setSwipeOffset({
            x: deltaX,
            rotation: rotation,
            opacity: opacity
        });
    };

    const resetSwipeAnimation = () => {
        setSwipeOffset({ x: 0, rotation: 0, opacity: 1 });
    };

    const swipeHandlers = useSwipe(
        () => { handleLike(); resetSwipeAnimation(); },
        () => { handleDislike(); resetSwipeAnimation(); },
        handleSwiping
    );

    useEffect(() => {
        const initializeRecipes = async () => {
            setLoading(true);
            const firstRecipe = await fetchRecipe();
            setCurrentRecipe(firstRecipe);
            await preloadNextRecipe();
            setLoading(false);
        };

        initializeRecipes();
    }, []);

    if(loading || !currentRecipe) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-700 to-red-500 flex items-center justify-center lg:pl-64">
                <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
                
                <button 
                    onClick={toggleSidebar}
                    className="fixed top-4 left-4 z-30 lg:hidden p-3 bg-white bg-opacity-20 backdrop-blur-sm text-white rounded-lg hover:bg-opacity-30 transition-all duration-200"
                >
                    <IoMenu className="text-2xl" />
                </button>

                <div className="text-center px-4">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white border-opacity-80 mx-auto mb-4"></div>
                    <div className="text-xl md:text-2xl text-white font-semibold">Loading delicious recipes...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-red-900 via-red-700 to-red-500">
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            
            <button 
                onClick={toggleSidebar}
                className="fixed top-4 left-4 z-30 lg:hidden p-3 bg-white bg-opacity-20 backdrop-blur-sm text-white rounded-lg hover:bg-opacity-30 transition-all duration-200"
            >
                <IoMenu className="text-2xl" />
            </button>
            
            <div className="flex-1 lg:pl-64 min-h-screen relative overflow-hidden">
                <div className="absolute inset-0 bg-black bg-opacity-10"></div>
                <div className="absolute top-20 left-20 w-32 h-32 bg-red-300 rounded-full opacity-20 blur-xl"></div>
                <div className="absolute bottom-40 right-32 w-48 h-48 bg-red-400 rounded-full opacity-15 blur-2xl"></div>
                <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-red-200 rounded-full opacity-25 blur-lg"></div>
                
                <div className="relative z-10 flex items-center justify-center min-h-screen py-8 pt-20 lg:pt-8">
                    <div className="max-w-sm w-full px-4 mx-auto">
                        <div className="text-center mb-6 md:mb-8">
                            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 drop-shadow-lg flex items-center justify-center gap-2 md:gap-3">
                                <GiCookingPot className="text-3xl md:text-4xl lg:text-5xl" />
                                <span className="hidden sm:inline">Recipe Swiper</span>
                                <span className="sm:hidden">Swiper</span>
                            </h1>
                            <p className="text-red-100 text-sm md:text-base lg:text-lg font-medium">
                                Discover your next favorite dish
                            </p>
                        </div>

                        <div 
                            {...swipeHandlers}
                            className={`bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-red-200 transition-all duration-300 ${
                                isChanging ? 'opacity-0 scale-95 rotate-2' : ''
                            }`}
                            style={{ 
                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)',  
                                transform: `translateX(${swipeOffset.x}px) rotate(${swipeOffset.rotation}deg)`,
                                opacity: swipeOffset.opacity,
                                transition: swipeOffset.x === 0 ? 'transform 0.3s ease-out, opacity 0.3s ease-out' : 'none'
                            }}
                        >
                            <div className="w-full h-64 sm:h-72 md:h-80 bg-gray-300 relative overflow-hidden">
                                {currentRecipe.image ? (
                                    <img 
                                        src={currentRecipe.image} 
                                        alt={currentRecipe.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-500 bg-gradient-to-br from-red-50 to-red-100">
                                        <div className="text-center">
                                            <IoRestaurant className="text-8xl mb-2 text-red-400" />
                                            <div className="text-lg font-medium text-red-600">No image available</div>
                                        </div>
                                    </div>
                                )}
                                
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/70 to-transparent p-3 md:p-4">
                                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 line-clamp-2">{currentRecipe.title}</h2>
                                    <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 text-red-200">
                                        <span className="flex items-center gap-1 text-xs sm:text-sm">
                                            <BiTime className="text-sm md:text-lg" />
                                            <span className="hidden sm:inline">{currentRecipe.cookingTime} min</span>
                                            <span className="sm:hidden">{currentRecipe.cookingTime}m</span>
                                        </span>
                                        <span className="flex items-center gap-1 text-xs sm:text-sm">
                                            <HiUsers className="text-sm md:text-lg" />
                                            <span className="hidden sm:inline">{currentRecipe.servings} servings</span>
                                            <span className="sm:hidden">{currentRecipe.servings}</span>
                                        </span>
                                        <span className="flex items-center gap-1 text-xs sm:text-sm">
                                            <RiBarChart2Fill className="text-sm md:text-lg" />
                                            {currentRecipe.difficulty}
                                        </span>
                                    </div>
                                </div>

                                <div className="absolute top-3 right-3 md:top-4 md:right-4">
                                    <span className={`px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-bold flex items-center gap-1 ${
                                        currentRecipe.category === 'Sweet' 
                                            ? 'bg-pink-500 text-white' 
                                            : 'bg-orange-500 text-white'
                                    }`}>
                                        {currentRecipe.category === 'Sweet' ? (
                                            <>
                                                <GiCupcake className="text-sm md:text-lg" />
                                                <span className="hidden sm:inline">Sweet</span>
                                                <span className="sm:hidden">🧁</span>
                                            </>
                                        ) : (
                                            <>
                                                <MdOutlineRamenDining className="text-sm md:text-lg" />
                                                <span className="hidden sm:inline">Salty</span>
                                                <span className="sm:hidden">🍜</span>
                                            </>
                                        )}
                                    </span>
                                </div>
                            </div>

                            <div className="flex justify-center items-center p-4 md:p-6 bg-gradient-to-r from-red-50 to-red-100">
                                <div className="flex space-x-6 md:space-x-8">
                                    <button 
                                        onClick={handleDislike}
                                        disabled={isChanging}
                                        className={`group relative p-3 md:p-4 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-full hover:from-red-600 hover:to-red-700 transition-all duration-200 transform hover:scale-110 shadow-lg hover:shadow-xl ${
                                            isChanging ? 'opacity-50 cursor-not-allowed scale-95' : ''
                                        }`}
                                    >
                                        <IoClose className="text-2xl md:text-3xl" />
                                        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-black bg-opacity-75 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden md:block">
                                            Pass
                                        </div>
                                    </button>

                                    <button 
                                        onClick={handleLike}
                                        disabled={isChanging}
                                        className={`group relative p-3 md:p-4 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-full hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-110 shadow-lg hover:shadow-xl ${
                                            isChanging ? 'opacity-50 cursor-not-allowed scale-95' : ''
                                        }`}
                                    >
                                        <IoHeart className="text-2xl md:text-3xl" />
                                        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-black bg-opacity-75 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden md:block">
                                            Like
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="text-center mt-4 md:mt-6">
                            <p className="text-red-100 text-xs sm:text-sm flex items-center justify-center gap-1 sm:gap-2 px-4">
                                <IoClose className="text-red-300 text-sm" />
                                <span className="hidden sm:inline">Swipe Left o Pass</span>
                                <span className="sm:hidden">Left = Pass</span>
                                <span className="mx-1 sm:mx-2">•</span>
                                <IoHeart className="text-red-300 text-sm" />
                                <span className="hidden sm:inline">Swipe Right o Like</span>
                                <span className="sm:hidden">Right = Like</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;