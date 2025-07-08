import { useState, useEffect } from "react";
import { createRecipe, updateRecipe } from "../services/recipe.service";
import { useNavigate } from "react-router-dom";

export const useRecipeForm = (initialRecipe = null, isEditing = false) => {
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState(initialRecipe || {
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

    useEffect(() => {
        if (initialRecipe) {
            setRecipe(initialRecipe);
        }
    }, [initialRecipe]);

    const handleChange = (e) => {
        setRecipe({...recipe, [e.target.name]: e.target.value});
    };

    const updateImage = (imageUrl) => {
        setRecipe(prev => ({...prev, image: imageUrl}));
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

    const removeIngredient = (index) => {
        const updatedIngredients = recipe.ingredients.filter((_, i) => i !== index);
        setRecipe({...recipe, ingredients: updatedIngredients});
    };

    const removeStep = (index) => {
        const updatedSteps = recipe.steps.filter((_, i) => i !== index);
        const renumberedSteps = updatedSteps.map((step, i) => ({...step, stepNumber: i + 1}));
        setRecipe({...recipe, steps: renumberedSteps});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if(isEditing) {
                await updateRecipe(recipe._id, recipe);
                navigate(`/recipe/${recipe._id}`);
            } else {
                await createRecipe(recipe);
                navigate('/');
            }
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
        removeIngredient,
        removeStep,
        handleSubmit,
        updateImage
    }
    
}