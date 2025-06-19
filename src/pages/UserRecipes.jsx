import { useEffect, useState } from "react";
import { getUserRecipes } from "../services/recipe.service";
import { Link } from "react-router-dom";

function UserRecipes() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const userRecipes = await getUserRecipes();
                setRecipes(userRecipes);
            } catch(err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchRecipes();
    }, []);

    if(loading) return <div>Loading...</div>;
    if(error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>My Recipes</h1>
            {recipes.map((recipe) => (
                <div key={recipe._id}>
                    <h2>{recipe.title}</h2>
                    <p>{recipe.description}</p>
                </div>
            ))}
            <Link to="/create">Create Recipe</Link>
        </div>
    )
}

export default UserRecipes;