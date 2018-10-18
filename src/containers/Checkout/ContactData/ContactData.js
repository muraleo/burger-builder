import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import Input from "../../../components/UI/Input/Input";
import classes from "./ContactData.module.css";
import axios from "../../../axios-db";
import Spinner from "../../../components/UI/Spinner/Spinner";

class ContactData extends Component {
	state = {
		name: "",
		email: "",
		address: {
			street: "",
			postalCode: ""
		}
	};

	orderHandler = event => {
		event.preventDefault();
		this.setState({ loading: true });
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			customer: {
				name: "Leo",
				address: {
					street: "test street",
					zipcode: "12345",
					country: "USA"
				},
				email: "test@test.com"
			},
			deliveryMethod: "fastest"
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

	render() {
		let form = (
			<form>
				<Input
					inputtype="input"
					type="text"
					name="name"
					placeholder="Your name"
				/>
				<Input
					inputtype="input"
					type="email"
					name="email"
					placeholder="Email address"
				/>
				<Input
					inputtype="input"
					type="text"
					name="street"
					placeholder="Street"
				/>
				<Input
					inputtype="input"
					type="text"
					name="postal"
					placeholder="Zip code"
				/>
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
