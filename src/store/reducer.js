import * as actions from "./actions";

const initialState = {
	ingredients: {
		salad: 0,
		bacon: 0,
		cheese: 0,
		meat: 0
	},
	price: 4
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actions.ADD_INGREDIENT:
			console.log(state);
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredientName]:
						state.ingredients[action.ingredientName] + 1
				}
			};
		case actions.REMOVE_INGREDIENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredientName]:
						state.ingredients[action.ingredientName] > 1
							? state.ingredients[action.ingredientName] - 1
							: 0
				}
			};
		default:
			return state;
	}
};

export default reducer;
