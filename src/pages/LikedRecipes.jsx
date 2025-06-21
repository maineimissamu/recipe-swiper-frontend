import { useEffect, useState } from "react";
import { getLikedRecipes } from "../services/swipe.service";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

function LikedRecipes() {
    const [likedRecipes, setLikedRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleRecipeClick = (recipeId) => {
        navigate(`/recipe/${recipeId}`);
    }

    useEffect(() => {
        const fetchLikedRecipes = async () => {
            try {
                const response = await getLikedRecipes();
                setLikedRecipes(response.likedRecipes);
            } catch(err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchLikedRecipes();
    }, []);

    if(loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center pl-64">
                <div className="text-2xl text-gray-600">Loading...</div>
            </div>
        );
    }

    if(error) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center pl-64">
                <div className="text-2xl text-red-600">Error: {error}</div>
            </div>
        );
    }
    
    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 pl-64 p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Liked Recipes</h1>
                
                {likedRecipes.length === 0 ? (
                    <div className="flex items-center justify-center h-[calc(100vh-200px)]">
                        <p className="text-xl text-gray-500">No liked recipes yet</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {likedRecipes.map((interaction) => (
                            <div key={interaction._id} className="bg-white rounded-lg shadow-xl overflow-hidden cursor-pointer" onClick={() => handleRecipeClick(interaction.recipe._id)}>
                                <div className="w-full h-64 bg-gray-300 relative hover:opacity-80 transition-opacity duration-300">
                                    {interaction.recipe.image ? (
                                        <img 
                                            src={interaction.recipe.image} 
                                            alt={interaction.recipe.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-500">
                                            No image available
                                        </div>
                                    )}
                                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-3">
                                        <h2 className="text-xl font-semibold text-white">{interaction.recipe.title}</h2>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default LikedRecipes;