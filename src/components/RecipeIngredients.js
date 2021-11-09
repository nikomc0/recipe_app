import React, { Component } from "react";
import IngredientCard from "./IngredientCard";

class RecipeIngredients extends Component {
    componentDidMount() {
        // this.parseIngredients();
    }

    render() {
        let recipeAlert;
        if (this.props.selectedIngredients.length === 0) {
            recipeAlert = <div className="alert alert-warning w-50" role="alert">
                Please Select A Recipe.
            </div>
        }

        const recipes = this.props.selectedIngredients.map((recipe) => {
            return (
                <IngredientCard
                    key={recipe.id}
                    id={recipe.id}
                    ingredients={recipe.ingredients}
                    recipeName={recipe.recipe_name}
                />
            );
        });

        return (
            <div className="col">
                <h3>List of Ingredients</h3>
                <h6>for selected recipes</h6>

                <div className="gap-3">{recipeAlert}</div>

                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {recipes}
                </div>
            </div>
        );
    }
}

export default RecipeIngredients;
