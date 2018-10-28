import * as actionTypes from "./actionTypes";
import axios from "axios";

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

export const auth = (email, password, isSignIn) => {
	return dispatch => {
		dispatch(authStart());
		const authData = {
			email: email,
			password: password,
			returnSecureToken: true
		};
		let url =
			"https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBdRsiDHXsY74ESLO5oMI7RFZriK6tFcqY";
		if (isSignIn) {
			url =
				"https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBdRsiDHXsY74ESLO5oMI7RFZriK6tFcqY";
		}
		axios
			.post(url, authData)
			.then(res => {
				console.log(res);
				dispatch(authSuccess(res.data));
			})
			.catch(err => {
				console.log(err);
				dispatch(authFailed(err));
			});
	};
};
