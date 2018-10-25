import * as actionTypes from "./actionTypes";
import axios from "../../axios-db";

export const purchaseBurgerSuccess = (id, orderData) => {
	return {
		type: actionTypes.PURCHASE_BURGER_SUCCESS,
		orderId: id,
		orderData: orderData
	};
};

export const purchaseBurgerFailed = error => {
	return {
		type: actionTypes.PURCHASE_BURGER_FAILED,
		error: error
	};
};

export const purchaseBurgerStart = orderData => {
	return dispatch => {
		axios
			.post("/order.json", orderData)
			.then(response => {
				dispatch(
					actionTypes.PURCHASE_BURGER_SUCCESS(
						response.data,
						orderData
					)
				);
			})
			.catch(err => {
				dispatch(actionTypes.PURCHASE_BURGER_FAILED(err));
			});
	};
};
