import React, { Component } from "react";
import IngredientCard from "./IngredientCard";

class RecipeIngredients extends Component {
    componentDidMount() {
        console.log(this);
    }

    render() {
        let recipeAlert;

        if (this.props.selectedIngredients.length === 0) {
            recipeAlert = <div className="alert alert-warning w-50" role="alert">
                Please Select A Recipe.
            </div>
        }

        const recipes = this.props.selectedIngredients.map((item) => {
            return (
                <IngredientCard
                    key={item.recipe.id}
                    id={item.recipe.id}
                    ingredients={item.recipe_ingredients}
                    recipeName={item.recipe.name}
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
