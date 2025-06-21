import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { getRecipeById } from '../services/recipe.service';

function RecipeDetails() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const recipeData = await getRecipeById(id);
                if (recipeData.message) {
                    throw new Error(recipeData.message);
                }
                setRecipe(recipeData);
            } catch(err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchRecipe();
    }, [id]);
    
    if(loading) {
        return (
            <div className="flex min-h-screen bg-gray-100">
                <Sidebar />
                <div className="flex-1 p-8">
                    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">Loading recipe...</h1>
                    </div>
                </div>
            </div>
        )
    }

    if(error) {
        return (
            <div className="flex min-h-screen bg-gray-100">
                <Sidebar />
                <div className="flex-1 p-8">
                    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">Error loading recipe</h1>
                        <p className="text-red-500">{error}</p>
                        <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 pl-64 p-8">
                {recipe && (
                    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
                        <div className="w-full h-96 relative">
                            {recipe.image ? (
                                <img
                                    src={recipe.image}
                                    alt={recipe.title}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                    <span className="text-gray-500">No image available</span>
                                </div>
                            )}
                        </div>
                        <div className="p-8">
                            <h1 className="text-4xl font-bold text-gray-800 mb-4">{recipe.title}</h1>
                            <div className="mb-6">
                                <h2 className="text-2xl font-semibold text-gray-700 mb-2">Description</h2>
                                <p className="text-gray-600">{recipe.description}</p>
                            </div>
                            
                            <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Cooking Time</h3>
                                    <p className="text-lg font-semibold">{recipe.cookingTime} minutes</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Servings</h3>
                                    <p className="text-lg font-semibold">{recipe.servings}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Difficulty</h3>
                                    <p className="text-lg font-semibold">{recipe.difficulty}</p>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h2 className="text-2xl font-semibold text-gray-700 mb-2">Ingredients</h2>
                                <ul className="list-disc list-inside text-gray-600">
                                    {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
                                        <li key={index}>
                                            {ingredient.quantity} {ingredient.unit} {ingredient.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h2 className="text-2xl font-semibold text-gray-700 mb-2">Instructions</h2>
                                <ol className="list-decimal list-inside text-gray-600">
                                    {recipe.steps && recipe.steps.map((step, index) => (
                                        <li key={index} className="mb-2">
                                            {step.instruction}
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default RecipeDetails;