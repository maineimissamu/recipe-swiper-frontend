import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createRecipe } from "../services/recipe.service";
import { useRecipeForm } from "../hooks/useRecipeForm";
import Sidebar from "../components/Sidebar";

function CreateRecipe() {
    const {recipe, handleChange, handleIngredientChange, handleStepChange, addIngredient, addStep, handleSubmit} = useRecipeForm();

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            {/* Main Content */}
            <div className="flex-1 pl-64 p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Create Recipe</h1>
                
                <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Basic Information */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                <input 
                                    type="text" 
                                    name="title" 
                                    placeholder="Enter recipe title" 
                                    value={recipe.title} 
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea 
                                    name="description" 
                                    placeholder="Enter recipe description" 
                                    value={recipe.description} 
                                    onChange={handleChange}
                                    rows="3"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                                <input 
                                    type="text" 
                                    name="image" 
                                    placeholder="Enter image URL" 
                                    value={recipe.image} 
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                        </div>

                        {/* Ingredients Section */}
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
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                    <input 
                                        type="text" 
                                        name="quantity" 
                                        placeholder="Quantity" 
                                        value={ingredient.quantity} 
                                        onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                                        className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                    <input 
                                        type="text" 
                                        name="unit" 
                                        placeholder="Unit" 
                                        value={ingredient.unit} 
                                        onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
                                        className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>
                            ))}
                            <button 
                                type="button" 
                                onClick={addIngredient}
                                className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors duration-200"
                            >
                                + Add Ingredient
                            </button>
                        </div>

                        {/* Steps Section */}
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
                                        className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                    <input 
                                        type="text" 
                                        name="instruction" 
                                        placeholder="Step instruction" 
                                        value={step.instruction} 
                                        onChange={(e) => handleStepChange(index, 'instruction', e.target.value)}
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>
                            ))}
                            <button 
                                type="button" 
                                onClick={addStep}
                                className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors duration-200"
                            >
                                + Add Step
                            </button>
                        </div>

                        {/* Additional Details */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Cooking Time (minutes)</label>
                                <input 
                                    type="number" 
                                    name="cookingTime" 
                                    placeholder="Time in minutes" 
                                    value={recipe.cookingTime} 
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                                <select 
                                    name="difficulty" 
                                    value={recipe.difficulty} 
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    <option value="Salty">Salty</option>
                                    <option value="Sweet">Sweet</option>
                                </select>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button 
                                type="submit"
                                className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200"
                            >
                                Create Recipe
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateRecipe;