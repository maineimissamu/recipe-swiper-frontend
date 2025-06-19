import { useAuth } from "../context/AuthContext";
import { getRandomRecipe } from "../services/recipe.service";
import { useState, useEffect } from "react";
import { likeRecipe, dislikeRecipe } from "../services/swipe.service";
import Sidebar from "../components/Sidebar";

function Home() {
    const {user} = useAuth();
    const [currentRecipe, setCurrentRecipe] = useState(null);
    const [nextRecipe, setNextRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isChanging, setIsChanging] = useState(false);

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
            <div className="min-h-screen bg-gray-100 flex items-center justify-center pl-64">
                <div className="text-2xl text-gray-600">Loading...</div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 pl-64 min-h-screen">
                <div className="flex items-center justify-center h-screen">
                    <div className="max-w-sm w-full px-4">
                        <div 
                            className={`bg-white rounded-lg shadow-xl overflow-hidden transform transition-all duration-300 ${
                                isChanging ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                            }`}
                        >
                            <div className="w-full h-80 bg-gray-300 relative">
                                {currentRecipe.image ? (
                                    <img 
                                        src={currentRecipe.image} 
                                        alt={currentRecipe.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                                        No image available
                                    </div>
                                )}
                                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-3">
                                    <h2 className="text-xl font-semibold text-white">{currentRecipe.title}</h2>
                                </div>
                            </div>

                            <div className="flex justify-between items-center p-3">
                                <button 
                                    onClick={handleDislike}
                                    disabled={isChanging}
                                    className={`p-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors duration-200 ${
                                        isChanging ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                </button>

                                <button 
                                    onClick={handleLike}
                                    disabled={isChanging}
                                    className={`p-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors duration-200 ${
                                        isChanging ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;