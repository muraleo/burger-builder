import React, { Component } from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.module.css";

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
		}
	};

	checkValidity(value, rules) {
		let isValid = true;
		if (!rules) {
			return true;
		}

		if (rules.required) {
			isValid = value.trim() !== "" && isValid;
		}

		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid;
		}

		if (rules.maxLength) {
			isValid = value.length <= rules.maxLength && isValid;
		}

		if (rules.isEmail) {
			const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
			isValid = pattern.test(value) && isValid;
		}

		if (rules.isNumeric) {
			const pattern = /^\d+$/;
			isValid = pattern.test(value) && isValid;
		}

		return isValid;
	}

	inputChangedHandler = (event, inputName) => {
		const updatedControls = {
			...this.state.controls,
			[inputName]: {
				...this.state.controls[inputName],
				value: event.target.value,
				valid: this.checkValidity(
					event.target.value,
					this.state.controls[inputName].validation
				),
				touched: true
			}
		};

		this.setState({ controls: updatedControls });
	};

	render() {
		let formElements = [];
		for (let key in this.state.controls) {
			formElements.push({
				id: key,
				config: this.state.controls[key]
			});
		}
		const form = formElements.map(e => (
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
		return (
			<div className={classes.Auth}>
				{form}
				<Button btnType="Success">SUBMIT</Button>
			</div>
		);
	}
}

export default Auth;
