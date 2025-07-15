import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createRecipe } from "../services/recipe.service";
import { useRecipeForm } from "../hooks/useRecipeForm";
import Sidebar from "../components/Sidebar";
import ImageUpload from "../components/ImageUpload";

function CreateRecipe() {
    const {recipe, error, isLoading, handleChange, handleIngredientChange, handleStepChange, addIngredient, addStep, handleSubmit, updateImage} = useRecipeForm();

    const handleImageUpload = (url) => {
        updateImage(url);
    }

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 pl-64 p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Create Recipe</h1>
                <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                                <p className="text-sm">{error}</p>
                            </div>
                        )}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                <input 
                                    type="text" 
                                    name="title" 
                                    placeholder="Enter recipe title" 
                                    value={recipe.title} 
                                    onChange={handleChange}
                                    disabled={isLoading}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea 
                                    name="description" 
                                    placeholder="Enter recipe description" 
                                    value={recipe.description} 
                                    onChange={handleChange}
                                    disabled={isLoading}
                                    rows="3"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                                <ImageUpload onImageUploaded={handleImageUpload} currentImage={recipe.image} />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold text-gray-800">Ingredients</h2>
                            {recipe.ingredients.map((ingredient, index) => (
                                <div key={index} className="flex gap-4">
                                    <input 
                                        type="text" 
                                        name="name" 
                                        placeholder="Ingredient name" 
                                        value={ingredient.name} 
                                        onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                                        disabled={isLoading}
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                    />
                                    <input 
                                        type="text" 
                                        name="quantity" 
                                        placeholder="Quantity" 
                                        value={ingredient.quantity} 
                                        onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                                        disabled={isLoading}
                                        className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                    />
                                    <input 
                                        type="text" 
                                        name="unit" 
                                        placeholder="Unit" 
                                        value={ingredient.unit} 
                                        onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
                                        disabled={isLoading}
                                        className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                    />
                                </div>
                            ))}
                            <button 
                                type="button" 
                                onClick={addIngredient}
                                disabled={isLoading}
                                className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                + Add Ingredient
                            </button>
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold text-gray-800">Steps</h2>
                            {recipe.steps.map((step, index) => (
                                <div key={index} className="flex gap-4">
                                    <input 
                                        type="number" 
                                        name="stepNumber" 
                                        placeholder="#" 
                                        value={step.stepNumber} 
                                        onChange={(e) => handleStepChange(index, 'stepNumber', e.target.value)}
                                        disabled={isLoading}
                                        className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                    />
                                    <input 
                                        type="text" 
                                        name="instruction" 
                                        placeholder="Step instruction" 
                                        value={step.instruction} 
                                        onChange={(e) => handleStepChange(index, 'instruction', e.target.value)}
                                        disabled={isLoading}
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                    />
                                </div>
                            ))}
                            <button 
                                type="button" 
                                onClick={addStep}
                                disabled={isLoading}
                                className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                + Add Step
                            </button>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Cooking Time (minutes)</label>
                                <input 
                                    type="number" 
                                    name="cookingTime" 
                                    placeholder="Time in minutes" 
                                    value={recipe.cookingTime} 
                                    onChange={handleChange}
                                    disabled={isLoading}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Servings</label>
                                <input 
                                    type="number" 
                                    name="servings" 
                                    placeholder="Number of servings" 
                                    value={recipe.servings} 
                                    onChange={handleChange}
                                    disabled={isLoading}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                                <select 
                                    name="difficulty" 
                                    value={recipe.difficulty} 
                                    onChange={handleChange}
                                    disabled={isLoading}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <option value="Easy">Easy</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Hard">Hard</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                <select 
                                    name="category" 
                                    value={recipe.category} 
                                    onChange={handleChange}
                                    disabled={isLoading}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <option value="Salty">Salty</option>
                                    <option value="Sweet">Sweet</option>
                                </select>
                            </div>
                        </div>
                        <div className="pt-4">
                            <button 
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex justify-center items-center py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-indigo-600"
                            >
                                {isLoading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-white border-opacity-80 mr-2"></div>
                                        Creating Recipe...
                                    </>
                                ) : (
                                    'Create Recipe'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateRecipe;