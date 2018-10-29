import React, { Component } from "react";
import AUX from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-db";
import Spinner from "../../components/UI/Spinner/Spinner";
import WithErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

export class BurgerBuilder extends Component {
	// can use constructor
	// constructor(props){
	//     super(props);
	//     this.state = {

	//     }
	// }

	state = {
		// purchasable: true,
		// purchasing: false,
		loading: false
		// error: false
	};

	componentDidMount() {
		this.props.onInitIngredients();
	}

	addIngredientHandler = type => {
		// const newCount = this.state.ingredients[type] + 1;
		// const newIngredientCount = { ...this.state.ingredients };
		// newIngredientCount[type] = newCount;
		// const newTotalPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
		// this.setState({
		// 	totalPrice: newTotalPrice,
		// 	ingredients: newIngredientCount
		// });
		// this.updatePurchasableState(1);
	};

	removeIngredientHandler = type => {
		// if (this.state.ingredients[type] > 0) {
		// 	const newCount = this.state.ingredients[type] - 1;
		// 	const newIngredientCount = { ...this.state.ingredients };
		// 	newIngredientCount[type] = newCount;
		// 	const newTotalPrice =
		// 		this.state.totalPrice - INGREDIENT_PRICES[type];
		// 	this.setState({
		// 		totalPrice: newTotalPrice,
		// 		ingredients: newIngredientCount
		// 	});
		// 	this.updatePurchasableState(-1);
		// }
	};

	updatePurchasableState(ingredients) {
		// const ingredients = { ...this.state.ingredients };
		const sum = Object.values(ingredients).reduce((sum, cur) => {
			return sum + cur;
		}, 0);
		return sum + this.props.totalPrice <= 4;
	}

	updatePurchaseHandler = () => {
		if (this.props.isAuth) {
			this.setState({ purchasing: true });
		} else {
			this.props.onSetAuthRedirectPath("/checkout");
			this.props.history.push("/auth");
		}
	};

	cancelPurchaseHandler = () => {
		this.setState({ purchasing: false });
	};

	continuePurchaseHandler = () => {
		// const queryParams = [];
		// for (let i in this.props.ings) {
		// 	queryParams.push(
		// 		encodeURIComponent(i) +
		// 			"=" +
		// 			encodeURIComponent(this.props.ings[i])
		// 	);
		// }
		// queryParams.push("price =" + this.props.totalPrice);
		// const queryString = queryParams.join("&");
		// this.props.history.push({
		// 	pathname: "checkout",
		// 	search: `?${queryString }`
		// });
		this.props.onInitPurchase();
		this.props.history.push("/checkout");
	};

	render() {
		const disabledInfo = { ...this.props.ings };
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}

		let orderSummary = null;
		let burger = this.props.error ? (
			<p>Ingredient can not be loaded!</p>
		) : (
			<Spinner />
		);
		if (this.props.ings) {
			burger = (
				<AUX>
					<Burger ingredients={this.props.ings} />
					<BuildControls
						ingredientAdded={this.props.onIngredientAdded}
						ingredientRemoved={this.props.onIngredientRemoved}
						disabledInfo={disabledInfo}
						totalPrice={this.props.totalPrice}
						purchasable={this.updatePurchasableState(
							this.props.ings
						)}
						ordered={this.updatePurchaseHandler}
						isAuth={this.props.isAuth}
					/>
				</AUX>
			);

			orderSummary = (
				<OrderSummary
					ingredients={this.props.ings}
					purchaseCanceled={this.cancelPurchaseHandler}
					purchaseContinued={this.continuePurchaseHandler}
					price={this.props.totalPrice}
				/>
			);
		}

		if (this.state.loading) {
			orderSummary = <Spinner />;
		}
		return (
			<AUX>
				<Modal
					show={this.state.purchasing}
					clicked={this.cancelPurchaseHandler}
				>
					{orderSummary}
				</Modal>
				{burger}
			</AUX>
		);
	}
}

const mapStatesToProps = state => {
	return {
		ings: state.burgerBuilder.ingredients,
		totalPrice: state.burgerBuilder.totalPrice,
		error: state.burgerBuilder.error,
		isAuth: state.auth.token !== null
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onIngredientAdded: ingName => dispatch(actions.addIngredient(ingName)),
		onIngredientRemoved: ingName =>
			dispatch(actions.removeIngredient(ingName)),
		onInitIngredients: () => {
			dispatch(actions.initialIngredients());
		},
		onInitPurchase: () => {
			dispatch(actions.purchaseInit());
		},
		onSetAuthRedirectPath: path => {
			dispatch(actions.setAuthRedirectPath(path));
		}
	};
};

export default connect(
	mapStatesToProps,
	mapDispatchToProps
)(WithErrorHandler(BurgerBuilder, axios));
