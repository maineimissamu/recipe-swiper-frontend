import api from "../utils/api";

export const getRandomRecipe = async () => {
    try {
        const response = await api.get('/swipe');
        return response.data;
    } catch(err) {
        throw err;
    }
};

export const createRecipe = async (recipeData) => {
    try {
        const response = await api.post('/recipes', recipeData);
        return response.data;
    } catch(err) {
        throw err;
    }
};
