import { useState } from "react";
import { createRecipe } from "../services/recipe.service";
import { useNavigate } from "react-router-dom";

export const useRecipeForm = () => {
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

    return {
        recipe,
        handleChange,
        handleIngredientChange,
        handleStepChange,
        addIngredient,
        addStep,
        handleSubmit
    }
    
}