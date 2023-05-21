import React, {useState} from 'react';
import {Link} from "react-router-dom";
import "./recipes.css";


function Recipes() {
    const [recipes] = useState([{ingredients: []}]);

    return (
        <div>
            <div>
                <button className="back-button"><Link to={"/"}>Back</Link></button>
            </div>
            <div className="recipe-list">
                {recipes.map((recipe, index) => (
                    <form className="recipe-form" key={index}>
                        <div className="recipe-image">
                            <img src="../public/logo192.png" alt=""/>
                        </div>
                        <div className="recipe-details">
                            <h2 className="recipe-name">{recipe.name}</h2>
                            <p className="recipe-time">Cooking Time: {recipe.cooking_time_in_min}</p>
                            <p className="recipe-calories">Calories: {recipe.kcal}</p>
                            <Link to={`/recipes/${recipe.name}`} className="recipe-button">Go to Recipe</Link>
                        </div>
                    </form>
                ))}
            </div>
        </div>
    );
}

export default Recipes;
