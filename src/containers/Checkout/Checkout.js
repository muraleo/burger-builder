import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route, Redirect } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";
// import * as actions from "../../store/actions/index";

class Checkout extends Component {
	// state = {
	// 	ingredients: null,
	// 	price: 0
	// };

	// componentWillMount() {
	// 	const query = new URLSearchParams(this.props.location.search);
	// 	const ingredients = {};
	// 	let price = 0;
	// 	for (let param of query.entries()) {
	// 		if (param[0] === "price") {
	// 			price = +param[1];
	// 		} else {
	// 			ingredients[param[0]] = +param[1];
	// 		}
	// 	}
	// 	this.setState({
	// 		ingredients: ingredients,
	// 		price: price
	// 	});
	// }

	// componentWillMount = () => {
	// 	this.props.onInitPurchase();
	// };

	checkoutCancelledHandler = () => {
		this.props.history.goBack();
	};

	checkoutContinuedHandler = () => {
		this.props.history.replace("/checkout/contact-data");
	};

	render() {
		let summary = <Redirect to="/" />;
		const purchasedRedirect = this.props.purchased ? (
			<Redirect to="/" />
		) : null;
		if (this.props.ings) {
			summary = (
				<div>
					{purchasedRedirect}
					<CheckoutSummary
						checkoutCancelled={this.checkoutCancelledHandler}
						checkoutContinued={this.checkoutContinuedHandler}
						ingredients={this.props.ings}
					/>
					<Route
						path="/checkout/contact-data"
						component={ContactData}
					/>
				</div>
			);
		}
		return summary;
	}
}

const mapStateToProps = state => {
	return {
		ings: state.burgerBuilder.ingredients,
		totalPrice: state.burgerBuilder.totalPrice,
		purchased: state.order.purchased
	};
};

// const mapDispatchToProps = dispatch => {
// 	return {
// 		onInitPurchase: () => dispatch(actions.purchaseInit())
// 	};
// };

export default connect(mapStateToProps)(Checkout);
