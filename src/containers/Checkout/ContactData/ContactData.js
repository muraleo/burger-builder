import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import Input from "../../../components/UI/Input/Input";
import classes from "./ContactData.module.css";
import axios from "../../../axios-db";
import Spinner from "../../../components/UI/Spinner/Spinner";
import { connect } from "react-redux";
import withErrorHandler from "../../../hoc/WithErrorHandler/WithErrorHandler";
import * as actionTypes from "../../../store/actions/index";

class ContactData extends Component {
	state = {
		orderForm: {
			name: {
				elementtype: "input",
				elementconfig: {
					type: "text",
					placeholder: "Name"
				},
				value: "",
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			email: {
				elementtype: "email",
				elementconfig: {
					type: "text",
					placeholder: "Email"
				},
				value: "",
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			street: {
				elementtype: "input",
				elementconfig: {
					type: "text",
					placeholder: "Street"
				},
				value: "",
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			zipCode: {
				elementtype: "input",
				elementconfig: {
					type: "text",
					placeholder: "Zipcode"
				},
				value: "",
				validation: {
					required: true,
					minLength: 5,
					maxLength: 5
				},
				valid: false,
				touched: false
			},
			country: {
				elementtype: "input",
				elementconfig: {
					type: "text",
					placeholder: "Country"
				},
				value: "",
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			deliveryMethod: {
				elementtype: "select",
				elementconfig: {
					options: ["fastest", "cheapest"]
				},
				value: "fastest",
				valid: true,
				validation: {}
			}
		},
		formIsValid: false
		// loading: false
	};

	orderHandler = event => {
		event.preventDefault();
		// this.setState({ loading: true });
		const contactData = {};
		for (let cid in this.state.orderForm) {
			contactData[cid] = this.state.orderForm[cid].value;
		}
		const order = {
			ingredients: this.props.ings,
			price: this.props.price,
			contact: contactData
		};
		this.props.onPurchaseBurgerStart(order, this.props.token);

		// console.log(order);
		// axios
		// 	.post("/order.json", order)
		// 	.then(response => {
		// 		this.setState({ loading: false });
		// 		this.props.history.push("/");
		// 	})
		// 	.catch(err => {
		// 		this.setState({ loading: false });
		// 	});
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

	inputChangedHandler = (event, inputId) => {
		const updatedOrderForm = { ...this.state.orderForm };
		const updatedFormElement = { ...updatedOrderForm[inputId] };
		updatedFormElement.value = event.target.value;
		updatedFormElement.valid = this.checkValidity(
			updatedFormElement.value,
			updatedFormElement.validation
		);
		updatedFormElement.touched = true;
		updatedOrderForm[inputId] = updatedFormElement;

		let formIsValid = true;
		for (let inputIdentifier in updatedOrderForm) {
			formIsValid =
				updatedOrderForm[inputIdentifier].valid && formIsValid;
		}
		this.setState({
			orderForm: updatedOrderForm,
			formIsValid: formIsValid
		});
	};

	render() {
		let formElements = [];
		for (let key in this.state.orderForm) {
			formElements.push({
				id: key,
				config: this.state.orderForm[key]
			});
		}
		let form = (
			<form onSubmit={this.orderHandler}>
				{formElements.map(e => (
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
				))}
				<Button btnType="Success" disabled={!this.state.formIsValid}>
					ORDER
				</Button>
			</form>
		);
		if (this.props.loading) {
			form = <Spinner />;
		}
		return (
			<div className={classes.ContactData}>
				<h1>Enter your contact data</h1>
				{form}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		loading: state.order.loading,
		token: state.auth.token
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onPurchaseBurgerStart: (orderData, token) =>
			dispatch(actionTypes.purchaseBurger(orderData, token))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(ContactData, axios));
