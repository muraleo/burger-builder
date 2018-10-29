import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initState = {
	token: null,
	userId: null,
	error: null,
	loading: null
};

const authStart = (state, action) => {
	return updateObject(state, {
		error: null,
		loading: true
	});
};

const authSuccess = (state, action) => {
	return updateObject(state, {
		token: action.authData.idToken,
		userId: action.authData.localId,
		error: null,
		loading: false
	});
};

const authFail = (state, action) => {
	return updateObject(state, {
		error: action.error,
		loading: false
	});
};

const reducer = (state = initState, action) => {
	switch (action.type) {
		case actionTypes.AUTH_START:
			return authStart(state, action);
		case actionTypes.AUTH_SUCCESS:
			return authSuccess(state, action);
		case actionTypes.AUTH_FAILED:
			return authFail(state, action);
		default:
			return state;
	}
};

export default reducer;