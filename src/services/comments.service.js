import api from '../utils/api';

export const getComments = async (recipeId) => {
    try {
        const response = await api.get(`/comments/recipe/${recipeId}`);
        return response.data;
    } catch(err) {
        throw err;
    }
}

export const createComment = async (recipeId, content) => {
    try {
        const response = await api.post('/comments', {recipeId, content});
        return response.data;
    } catch(err) {
        throw err;
    }
}

export const deleteComment = async (commentId) => {
    try {
        const response = await api.delete(`/comments/${commentId}`);
        return response.data;
    } catch(err) {
        throw err;
    }
}