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

export const getUserRecipes = async () => {
    try {
        const response = await api.get('/recipes/user/recipes');
        console.log(response.data);
        return response.data;
    } catch(err) {
        throw err;
    }
}

export const getRecipeById = async (id) => {
    try {
        const response = await api.get(`/recipes/${id}`);
        return response.data;
    } catch(err) {
        throw err;
    }
}

export const updateRecipe = async (id, recipeData) => {
    try {
        const response = await api.put(`/recipes/${id}`, recipeData);
        return response.data;
    } catch(err) {
        throw err;
    }
}

export const deleteRecipe = async (id) => {
    try {
        const response = await api.delete(`/recipes/${id}`);
        return response.data;
    } catch(err) {
        throw err;
    }
}