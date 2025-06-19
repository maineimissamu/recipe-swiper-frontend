import { useAuth } from "../context/AuthContext";
import { getRandomRecipe } from "../services/recipe.service";
import { useState, useEffect } from "react";
import { likeRecipe, dislikeRecipe } from "../services/swipe.service";
import { Link } from "react-router-dom";

function Home() {
    const {user, logout} = useAuth();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchRandomRecipe = async () => {
        setLoading(true);
        try {
            const response = await getRandomRecipe();
            setRecipe(response.recipe);
        } catch(err) {
            console.error('Error fetching recipe:', err);
        } finally {
            setLoading(false);
        }
    }

    const handleLike = async () => {
        try {
            await likeRecipe(recipe._id);
            fetchRandomRecipe();
        } catch(err) {
            console.error('Error liking recipe:', err);
        }
    }

    const handleDislike = async () => {
        try {
            await dislikeRecipe(recipe._id);
            fetchRandomRecipe();
        } catch(err) {
            console.error('Error disliking recipe:', err);
        }
    }

    useEffect(() => {
        fetchRandomRecipe();
    }, []);

    if(!recipe) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Welcome to the Home Page</h1>
            <button onClick={logout}>Logout</button>
            <Link to="/liked">Liked Recipes</Link>
            <div>
                <h2>{recipe.title}</h2>
                <p>{recipe.description}</p>
                <button onClick={handleLike}>Like</button>
                <button onClick={handleDislike}>Dislike</button>
            </div>
        </div>
    )
}

export default Home;