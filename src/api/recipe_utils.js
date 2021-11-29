import axios from 'axios'

const baseURL = process.env.REACT_APP_API_BASE_URL_PROD

var api = {};

api.getRecipes = function(){
	let response = axios
		.get(baseURL + `/recipes`);

	return response;
};

api.newRecipe = async function(newRecipe) {
	let response = await axios
		.post(baseURL + `/recipe`, newRecipe)

	return response;
}

api.getExistingRecipe = async function(currentRecipe){
	let response = await axios
		.get(baseURL + `/recipe/${currentRecipe}`)

	return response;
}

api.getIngredients = async function(){
	let response = await axios
    	.get(baseURL + `/ingredients`)
    
	return response;
}

api.newIngredient = async function(newIngredient) {
	// server is expecting 'ingredient' i.e. params['ingredient']['name']
	let ingredient = newIngredient
	let response = await axios
		.post(baseURL + `/ingredients`, { ingredient })

	return response;
}

api.saveIngredientsToRecipe = async function(currentRecipe, ingredients){
	let response = await axios
    	.post(baseURL + `/recipe_ingredients/${currentRecipe}`, { ingredients })

    return response;
}

export default api;