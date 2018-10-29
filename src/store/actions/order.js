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

export const purchaseBurger = (orderData, token) => {
	return dispatch => {
		dispatch(purchaseBurgerStart());
		axios
			.post(
				"https://leo-burger-builder.firebaseio.com/order.json?auth=" +
					token,
				orderData
			)
			.then(response => {
				dispatch(purchaseBurgerSuccess(response.data.name, orderData));
			})
			.catch(err => {
				console.log(err);
				dispatch(purchaseBurgerFailed(err));
			});
	};
};

export const purchaseInit = () => {
	return {
		type: actionTypes.PURCHASE_INIT
	};
};

export const fetchOrdersSuccess = orderData => {
	return {
		type: actionTypes.FETCH_ORDER_SUCCESS,
		order: orderData
	};
};

export const fetchOrdersFailed = err => {
	return {
		type: actionTypes.FETCH_ORDER_FAILED,
		error: err
	};
};

export const fetchOrderStart = () => {
	return {
		type: actionTypes.FETCH_ORDER_START
	};
};

export const fetchOrder = (token, userId) => {
	return dispatch => {
		dispatch(fetchOrderStart());
		axios
			.get(
				"/order.json?auth=" +
					token +
					'&orderBy="userId"&equalTo="' +
					userId +
					'"'
			)
			.then(res => {
				const fetchedOrders = [];
				for (let key in res.data) {
					fetchedOrders.push({
						id: key,
						...res.data[key]
					});
				}
				// console.log(fetchedOrders);
				dispatch(fetchOrdersSuccess(fetchedOrders));
			})
			.catch(err => {
				dispatch(fetchOrdersFailed(err));
			});
	};
};
