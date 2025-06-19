import { useAuth } from "../context/AuthContext";
import { getRandomRecipe } from "../services/recipe.service";
import { useState, useEffect } from "react";

function Home() {
    const {user, logout} = useAuth();
    const [recipe, setRecipe] = useState(null);

    const fetchRandomRecipe = async () => {
        try {
            const response = await getRandomRecipe();
            setRecipe(response.recipe);
        } catch(err) {
            console.error('Error fetching recipe:', err);
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
            <div>
                <h2>{recipe.title}</h2>
                <p>{recipe.description}</p>
                
            </div>
        </div>
    )
}

export default Home;