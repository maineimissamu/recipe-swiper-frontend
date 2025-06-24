import { useEffect, useState } from "react";
import { getUserRecipes, deleteRecipe } from "../services/recipe.service";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function UserRecipes() {
    const navigate = useNavigate();
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const userRecipes = await getUserRecipes();
                setRecipes(userRecipes);
            } catch(err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchRecipes();
    }, []);

    const handleRecipeClick = (recipeId) => {
        navigate(`/recipe/${recipeId}`);
    };

    const handleEdit = (e, recipeId) => {
        e.stopPropagation();
        navigate(`/recipe/${recipeId}/edit`);
    };

    const handleDelete = async (e, recipeId) => {
        e.stopPropagation();
        if (window.confirm('¿Estás seguro de que quieres borrar esta receta?')) {
            try {
                await deleteRecipe(recipeId);
                setRecipes(recipes.filter(recipe => recipe._id !== recipeId));
            } catch (err) {
                console.error('Error deleting recipe:', err);
            }
        }
    };

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
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">My Recipes</h1>
                    <Link 
                        to="/create" 
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200"
                    >
                        Create Recipe
                    </Link>
                </div>
                
                {recipes.length === 0 ? (
                    <div className="flex items-center justify-center h-[calc(100vh-200px)]">
                        <div className="text-center">
                            <p className="text-xl text-gray-500 mb-4">You haven't created any recipes yet</p>
                            <Link 
                                to="/create" 
                                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200"
                            >
                                Create Your First Recipe
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {recipes.map((recipe) => (
                            <div 
                                key={recipe._id} 
                                className="bg-white rounded-lg shadow-xl overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
                                onClick={() => handleRecipeClick(recipe._id)}
                            >
                                <div className="w-full h-64 bg-gray-300 relative">
                                    {recipe.image ? (
                                        <img 
                                            src={recipe.image} 
                                            alt={recipe.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-500">
                                            No image available
                                        </div>
                                    )}
                                    <div className="absolute top-2 right-2 flex gap-2">
                                        <button
                                            onClick={(e) => handleEdit(e, recipe._id)}
                                            className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 text-sm"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={(e) => handleDelete(e, recipe._id)}
                                            className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 text-sm"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-3">
                                        <h2 className="text-xl font-semibold text-white">{recipe.title}</h2>
                                        <p className="text-sm text-gray-300 mt-1">
                                            {recipe.difficulty} • {recipe.cookingTime} mins • {recipe.servings} servings
                                        </p>
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

export default UserRecipes;