import * as actionTypes from "./actionTypes";
import axios from "axios";
import { secretKey } from "../../.env";

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START
	};
};

export const authSuccess = authData => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		authData: authData
	};
};

export const authFailed = error => {
	return {
		type: actionTypes.AUTH_FAILED,
		error: error
	};
};

export const authLogout = () => {
	return {
		type: actionTypes.AUTH_LOGOUT
	};
};

export const checkAuthTimeout = expirationTime => {
	return dispatch => {
		setTimeout(() => {
			dispatch(authLogout());
		}, expirationTime * 1000);
	};
};

export const auth = (email, password, isSignIn) => {
	return dispatch => {
		dispatch(authStart());
		const authData = {
			email: email,
			password: password,
			returnSecureToken: true
		};
		let url =
			"https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=" +
			secretKey;
		if (isSignIn) {
			url =
				"https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" +
				secretKey;
		}
		axios
			.post(url, authData)
			.then(res => {
				console.log(res);
				dispatch(authSuccess(res.data));
				dispatch(checkAuthTimeout(res.data.expiresIn));
			})
			.catch(err => {
				console.log(err);
				dispatch(authFailed(err.response.data.error));
			});
	};
};
