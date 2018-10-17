import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";

class ContactData extends Component {
	state = {
		name: "",
		email: "",
		address: {
			street: "",
			postalCode: ""
		}
	};

	render() {
		return (
			<div>
				<h1>Enter your contact data</h1>
				<form>
					<input type="text" name="name" placeholder="Your name" />
					<input
						type="email"
						name="email"
						placeholder="Email address"
					/>
					<input type="text" name="street" placeholder="Street" />
					<input type="text" name="postal" placeholder="Zip code" />
					<button btnType="success">ORDER</button>
				</form>
			</div>
		);
	}
}

export default ContactData;
