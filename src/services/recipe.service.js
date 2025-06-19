import api from "../utils/api";

export const getRandomRecipe = async () => {
    try {
        const response = await api.get('/swipe');
        return response.data;
    } catch(err) {
        throw err;
    }
};
