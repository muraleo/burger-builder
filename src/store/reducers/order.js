import * as actionTypes from "../actions/actionTypes";

const initialState = {
	order: [],
	loading: false,
	purchased: false
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.PURCHASE_INIT:
			return {
				...state,
				purchased: false
			};
		case actionTypes.PURCHASE_BURGER_START:
			return {
				...state,
				loading: true
			};
		case actionTypes.PURCHASE_BURGER_SUCCESS:
			const newOrder = {
				...action.orderData,
				id: action.orderId
			};
			return {
				...state,
				loading: false,
				order: state.order.concat(newOrder),
				purchased: true
			};
		case actionTypes.PURCHASE_BURGER_FAILED:
			return {
				...state,
				loading: false
			};
		case actionTypes.FETCH_ORDER_SUCCESS:
			return {
				...state,
				order: action.order,
				loading: false
			};
		case actionTypes.FETCH_ORDER_FAILED:
			return {
				...state,
				error: action.error,
				loading: false
			};
		case actionTypes.FETCH_ORDER_START:
			return {
				...state,
				loading: true
			};
		default:
			return state;
	}
};

export default reducer;
