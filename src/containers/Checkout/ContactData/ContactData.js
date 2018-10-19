import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import Input from "../../../components/UI/Input/Input";
import classes from "./ContactData.module.css";
import axios from "../../../axios-db";
import Spinner from "../../../components/UI/Spinner/Spinner";

class ContactData extends Component {
	state = {
		orderForm: {
			name: {
				elementtype: "input",
				elementconfig: {
					type: "text",
					placeholder: "Name"
				},
				value: ""
			},
			email: {
				elementtype: "input",
				elementconfig: {
					type: "text",
					placeholder: "Email"
				},
				value: ""
			},
			street: {
				elementtype: "input",
				elementconfig: {
					type: "text",
					placeholder: "Street"
				},
				value: ""
			},
			zipCode: {
				elementtype: "input",
				elementconfig: {
					type: "text",
					placeholder: "Zipcode"
				},
				value: ""
			},
			country: {
				elementtype: "input",
				elementconfig: {
					type: "text",
					placeholder: "Country"
				},
				value: ""
			},
			deliveryMethod: {
				elementtype: "select",
				elementconfig: {
					options: ["fastest", "cheapest"]
				},
				value: ""
			}
		}
	};

	orderHandler = event => {
		event.preventDefault();
		this.setState({ loading: true });
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price
		};
		// console.log(order);
		axios
			.post("/order.json", order)
			.then(response => {
				this.setState({ loading: false });
				this.props.history.push("/");
			})
			.catch(err => {
				this.setState({ loading: false });
			});
	};

	inputChangedHandler = (event, inputId) => {
		const updateOrderForm = { ...this.state.orderForm };
		const updateFormElement = { ...updateOrderForm[inputId] };
		updateFormElement.value = event.target.value;
		updateOrderForm[inputId] = updateFormElement;
		this.setState({ orderForm: updateOrderForm });
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
			<form>
				{formElements.map(e => (
					<Input
						key={e.id}
						elementtype={e.config.elementtype}
						elementconfig={e.config.elementconfig}
						value={e.config.value}
						changed={event => this.inputChangedHandler(event, e.id)}
					/>
				))}
				<Button btnType="Success" clicked={this.orderHandler}>
					ORDER
				</Button>
			</form>
		);
		if (this.state.loading) {
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

export default ContactData;
