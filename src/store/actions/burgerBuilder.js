import * as actionTypes from "./actionTypes";
import axios from "../../axios-db";

export const addIngredient = ingName => {
	return {
		type: actionTypes.ADD_INGREDIENT,
		ingredientName: ingName
	};
};

export const removeIngredient = ingName => {
	return {
		type: actionTypes.REMOVE_INGREDIENT,
		ingredientName: ingName
	};
};

export const setIngredients = ingredients => {
	return {
		type: actionTypes.SET_INGREDIENTS,
		ingredients: ingredients
	};
};

export const fetchIngredientsFailed = () => {
	return {
		type: actionTypes.FETCH_INGREDIENTS_FAILED
	};
};

export const initialIngredients = () => {
	return dispatch => {
		axios
			.get("https://leo-burger-builder.firebaseio.com/ingredients.json")
			.then(res => {
				dispatch(setIngredients(res.data));
			})
			.catch(err => {
				dispatch(fetchIngredientsFailed());
			});
	};
};
