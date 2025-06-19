import api from "../utils/api";

export const getLikedRecipes = async () => {
    try {
        const response = await api.get('/swipe/liked');
        return response.data;
    } catch(err) {
        throw err;
    }
}

export const likeRecipe = async (recipeId) => {
    try {
        const response = await api.post('/swipe/like', { recipeId });
        return response.data;
    } catch(err) {
        throw err;
    }
}

export const dislikeRecipe = async (recipeId) => {
    try {
        const response = await api.post('/swipe/dislike', { recipeId });
        return response.data;
    } catch(err) {
        throw err;
    }
}