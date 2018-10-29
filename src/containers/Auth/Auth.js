import React, { Component } from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.module.css";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { checkValidity } from "../../shared/utility";

class Auth extends Component {
	state = {
		controls: {
			email: {
				elementtype: "input",
				elementconfig: {
					type: "email",
					placeholder: "Email address"
				},
				value: "",
				validation: {
					required: true,
					isEmail: true
				},
				valid: false,
				touched: false
			},
			password: {
				elementtype: "input",
				elementconfig: {
					type: "password",
					placeholder: "Password"
				},
				value: "",
				validation: {
					required: true,
					minLength: 6
				},
				valid: false,
				touched: false
			}
		},
		isSignIn: true
	};

	componentDidMount = () => {
		if (!this.props.building && this.props.authRedirectPath !== "/") {
			this.props.onSetAuthRedirectPath();
		}
	};

	inputChangedHandler = (event, inputName) => {
		const updatedControls = {
			...this.state.controls,
			[inputName]: {
				...this.state.controls[inputName],
				value: event.target.value,
				valid: checkValidity(
					event.target.value,
					this.state.controls[inputName].validation
				),
				touched: true
			}
		};

		this.setState({ controls: updatedControls });
	};

	submitHandler = event => {
		event.preventDefault();
		this.props.onAuth(
			this.state.controls.email.value,
			this.state.controls.password.value,
			this.state.isSignIn
		);
	};

	switchAuthModeHandler = () => {
		this.setState(preState => {
			return { isSignIn: !preState.isSignIn };
		});
	};

	render() {
		let formElements = [];
		for (let key in this.state.controls) {
			formElements.push({
				id: key,
				config: this.state.controls[key]
			});
		}
		let form = null;
		if (this.props.loading) {
			form = <Spinner />;
		} else {
			form = formElements.map(e => (
				<Input
					key={e.id}
					elementtype={e.config.elementtype}
					elementconfig={e.config.elementconfig}
					value={e.config.value}
					invalid={!e.config.valid}
					shouldvalidate={e.config.validation}
					touched={e.config.touched}
					changed={event => this.inputChangedHandler(event, e.id)}
				/>
			));
		}

		let errorMessage = null;
		if (this.props.error) {
			errorMessage = <p>ERROR: {this.props.error.message}</p>;
		}

		let authRedirect = null;
		if (this.props.isAuthed) {
			authRedirect = <Redirect to={this.props.authRedirectPath} />;
		}

		return (
			<div className={classes.Auth}>
				{authRedirect}
				{errorMessage}
				<form onSubmit={this.submitHandler}>
					{form}
					<Button btnType="Success">SUBMIT</Button>
				</form>
				<Button clicked={this.switchAuthModeHandler} btnType="Danger">
					SWITCH TO {this.state.isSignIn ? "SIGN UP" : "SIGN IN"}
				</Button>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		loading: state.auth.loading,
		error: state.auth.error,
		isAuthed: state.auth.token !== null,
		building: state.burgerBuilder.building,
		authRedirectPath: state.auth.authRedirectPath
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onAuth: (email, password, isSignIn) =>
			dispatch(actions.auth(email, password, isSignIn)),
		onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/"))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Auth);
