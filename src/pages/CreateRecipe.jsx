import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createRecipe } from "../services/recipe.service";

function CreateRecipe() {
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState({
        title: '',
        description: '',
        image: '',
        ingredients: [{name: '', quantity: '', unit: ''}],
        steps: [{stepNumber: 1, instruction: ''}],
        cookingTime: '',
        servings: '',
        difficulty: 'Easy',
        category: 'Salty',
    });

    const handleChange = (e) => {
        setRecipe({...recipe, [e.target.name]: e.target.value});
    };

    const handleIngredientChange = (index, field, value) => {
        const updatedIngredients = [...recipe.ingredients];
        updatedIngredients[index][field] = value;
        setRecipe({...recipe, ingredients: updatedIngredients});
    };

    const handleStepChange = (index, field, value) => {
        const updatedSteps = [...recipe.steps];
        updatedSteps[index][field] = value;
        setRecipe({...recipe, steps: updatedSteps});
    };

    const addIngredient = () => {
        setRecipe({...recipe, ingredients: [...recipe.ingredients, {name: '', quantity: '', unit: ''}]});
    };

    const addStep = () => {
        setRecipe({...recipe, steps: [...recipe.steps, {stepNumber: recipe.steps.length + 1, instruction: ''}]});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createRecipe(recipe);
            navigate('/');
        } catch(err) {
            console.error('Error creating recipe:', err);
        }
    };

    return (
            <div>
            <h1>Create Recipe</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" placeholder="Title" value={recipe.title} onChange={handleChange} />
                <input type="text" name="description" placeholder="Description" value={recipe.description} onChange={handleChange} />
                <input type="text" name="image" placeholder="Image URL" value={recipe.image} onChange={handleChange} />
                <div>
                    {recipe.ingredients.map((ingredient, index) => (
                        <div key={index}>
                            <input type="text" name="name" placeholder="Ingredient" value={ingredient.name} onChange={(e) => handleIngredientChange(index, 'name', e.target.value)} />
                            <input type="text" name="quantity" placeholder="Quantity" value={ingredient.quantity} onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)} />
                            <input type="text" name="unit" placeholder="Unit" value={ingredient.unit} onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)} />
                        </div>
                    ))}
                    <button type="button" onClick={addIngredient}>Add Ingredient</button>
                </div>
                <div>
                    {recipe.steps.map((step, index) => (
                        <div key={index}>
                            <input type="number" name="stepNumber" placeholder="Step Number" value={step.stepNumber} onChange={(e) => handleStepChange(index, 'stepNumber', e.target.value)} />
                            <input type="text" name="instruction" placeholder="Instruction" value={step.instruction} onChange={(e) => handleStepChange(index, 'instruction', e.target.value)} />
                        </div>
                    ))}
                    <button type="button" onClick={addStep}>Add Step</button>
                </div>
                <input type="number" name="cookingTime" placeholder="Cooking Time" value={recipe.cookingTime} onChange={handleChange} />
                <input type="number" name="servings" placeholder="Servings" value={recipe.servings} onChange={handleChange} />
                <select name="difficulty" value={recipe.difficulty} onChange={handleChange}>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                </select>
                <select name="category" value={recipe.category} onChange={handleChange}>
                    <option value="Salty">Salty</option>
                    <option value="Sweet">Sweet</option>
                </select>
                <button type="submit">Create Recipe</button>
                </form>
        </div>
    )
}

export default CreateRecipe;