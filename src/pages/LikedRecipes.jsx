import { useEffect, useState } from "react";
import { getLikedRecipes } from "../services/swipe.service";

function LikedRecipes() {
    const [likedRecipes, setLikedRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLikedRecipes = async () => {
            try {
                const response = await getLikedRecipes();
                setLikedRecipes(response.likedRecipes);
            } catch(err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchLikedRecipes();
    }, []);

    if(loading) return <div>Loading...</div>;
    if(error) return <div>Error: {error}</div>;
    
    return (
        <div>
            <h1>Liked Recipes</h1>
            {likedRecipes.map((interaction) => (
                <div key={interaction._id}>
                    <h2>{interaction.recipe.title}</h2>
                    <p>{interaction.recipe.description}</p>
                    <img 
                        src={interaction.recipe.image} 
                        alt={interaction.recipe.title}
                        style={{ maxWidth: '300px' }}
                    />
                </div>
            ))}
            {likedRecipes.length === 0 && (
                <p>No liked recipes</p>
            )}
        </div>
    )
}

export default LikedRecipes;