
const List = [
	{id: 1, name: 'spaghetti', selected: false},
	{id: 3, name: 'tacos', selected: false},
	{id: 4, name: 'steak', selected: false},
	{id: 5, name: 'fancy mac & cheese', selected: false},
	{id: 2, name: 'turkey club', selected: false},
	{id: 6, name: 'Slow Cooker Lemon Chicken', selected: false},
	{id: 7, name: 'Sesame Chicken', selected: false},
	{id: 8, name: 'Chicken Tortellini', selected: false},
	{id: 9, name: 'Salad', selected: false},
	{id: 10, name: 'Pizza', selected: false},
];

const Ingredients = [
	{id: 1, name: 'salt'},
	{id: 2, name: 'cinammon'},
	{id: 3, name: 'paprika'},
	{id: 4, name: 'ginger'},
]

const RecipeIngredients = [
	{recipe_id: 1, recipe_name: 'spaghetti', ingredients: [
			{id: 1, name: 'salt'},
			{id: 2, name: 'cinammon'},
			{id: 3, name: 'paprika'},
			{id: 4, name: 'ginger'},
		]
	},
	{recipe_id: 3, recipe_name: 'tacos', ingredients: [{id: 2, name: 'pepper'}]},
	{recipe_id: 4, recipe_name: 'steak', ingredients: [{id: 3, name: 'chicken'}]},
	{recipe_id: 5, recipe_name: 'fancy mac & cheese', ingredients: [{id: 4, name: 'ground_beef'}]},
	{recipe_id: 2, recipe_name: 'turkey club', ingredients: [{id: 5, name: 'pizza_sauce'}]},
	{recipe_id: 6, recipe_name: 'Slow Cooker Lemon Chicken', ingredients: [{id: 6, name: 'cheese'}]},
	{recipe_id: 7, recipe_name: 'Sesame Chicken', ingredients: [{id: 7, name: 'broccoli'}]},
	{recipe_id: 8, recipe_name: 'Chicken Tortellini', ingredients: [{id: 8, name: 'garlic'}]},
	{recipe_id: 9, recipe_name: 'Salad', ingredients: [{id: 9, name: 'lettuce'}]},
	{recipe_id: 10, recipe_name: 'Pizza', ingredients: [{id: 10, name: 'tomato'}]}
]

var api = {};

api.getRecipes = function(){
	return List;
};

api.getRecipeIngredients = function(values){
	var ingredients = [];

	RecipeIngredients.map((x) => {
		if (values.includes(x.recipe_id)) {
			ingredients.push(x)
		}
		return ingredients
	});

	return ingredients
}

api.getIngredients = function(){
	return Ingredients;
}

api.addIngredient = function(value){
	var idCounter = 0
	// Find the last id
	Ingredients.forEach((x) => {
		if (x.id > idCounter) {
			idCounter = x.id
		}
	});

	// Increment idCounter
	idCounter += 1
	// create the ingredient object
	Ingredients.push({id: idCounter, name: value})

	// return the full ingredient object with name and id
	return idCounter
}

export default api;