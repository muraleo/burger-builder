import * as actionTypes from "./actionTypes";
import axios from "../../axios-db";

export const purchaseBurgerSuccess = (id, orderData) => {
	return {
		type: actionTypes.PURCHASE_BURGER_SUCCESS,
		orderId: id,
		orderData: orderData
	};
};

export const purchaseBurgerFailed = err => {
	return {
		type: actionTypes.PURCHASE_BURGER_FAILED,
		error: err
	};
};

export const purchaseBurgerStart = () => {
	return {
		type: actionTypes.PURCHASE_BURGER_START
	};
};

export const purchaseBurger = orderData => {
	return dispatch => {
		dispatch(purchaseBurgerStart());
		axios
			.post(
				"https://leo-burger-builder.firebaseio.com/order.json",
				orderData
			)
			.then(response => {
				dispatch(purchaseBurgerSuccess(response.data.name, orderData));
			})
			.catch(err => {
				dispatch(purchaseBurgerFailed(err));
			});
	};
};
