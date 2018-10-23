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
import * as actions from "../../store/actions";

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7
};

class BurgerBuilder extends Component {
	// can use constructor
	// constructor(props){
	//     super(props);
	//     this.state = {

	//     }
	// }

	state = {
		totalPrice: 4.0,
		purchasable: true,
		purchasing: false,
		loading: false,
		error: false
	};

	componentDidMount() {
		// axios
		// 	.get("https://leo-burger-builder.firebaseio.com/ingredients.json")
		// 	.then(res => {
		// 		this.setState({ ingredients: res.data });
		// 	})
		// 	.catch(err => {
		// 		this.setState({ error: true });
		// 	});
	}

	addIngredientHandler = type => {
		const newCount = this.state.ingredients[type] + 1;
		const newIngredientCount = { ...this.state.ingredients };
		newIngredientCount[type] = newCount;

		const newTotalPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
		this.setState({
			totalPrice: newTotalPrice,
			ingredients: newIngredientCount
		});

		this.updatePurchasableState(1);
	};

	removeIngredientHandler = type => {
		if (this.state.ingredients[type] > 0) {
			const newCount = this.state.ingredients[type] - 1;
			const newIngredientCount = { ...this.state.ingredients };
			newIngredientCount[type] = newCount;

			const newTotalPrice =
				this.state.totalPrice - INGREDIENT_PRICES[type];
			this.setState({
				totalPrice: newTotalPrice,
				ingredients: newIngredientCount
			});
			this.updatePurchasableState(-1);
		}
	};

	updatePurchasableState(offset) {
		const ingredients = { ...this.state.ingredients };
		const sum = Object.values(ingredients).reduce((sum, cur) => {
			return sum + cur;
		}, 0);
		this.setState({ purchasable: sum + offset <= 0 });
	}

	updatePurchaseHandler = () => {
		this.setState({ purchasing: true });
	};

	cancelPurchaseHandler = () => {
		this.setState({ purchasing: false });
	};

	continuePurchaseHandler = () => {
		const queryParams = [];
		for (let i in this.props.ings) {
			queryParams.push(
				encodeURIComponent(i) +
					"=" +
					encodeURIComponent(this.state.ingredients[i])
			);
		}
		queryParams.push("price =" + this.state.totalPrice);
		const queryString = queryParams.join("&");
		this.props.history.push({
			pathname: "checkout",
			search: `?${queryString}`
		});
	};

	render() {
		const disabledInfo = { ...this.props.ings };
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}

		let orderSummary = null;
		let burger = this.state.error ? (
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
						totalPrice={this.state.totalPrice}
						purchasable={this.state.purchasable}
						ordered={this.updatePurchaseHandler}
					/>
				</AUX>
			);

			orderSummary = (
				<OrderSummary
					ingredients={this.props.ings}
					purchaseCanceled={this.cancelPurchaseHandler}
					purchaseContinued={this.continuePurchaseHandler}
					price={this.state.totalPrice}
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
		ings: state.ingredients
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onIngredientAdded: ingName =>
			dispatch({ type: actions.ADD_INGREDIENT, ingredientName: ingName }),
		onIngredientRemoved: ingName =>
			dispatch({
				type: actions.REMOVE_INGREDIENT,
				ingredientName: ingName
			})
	};
};

export default connect(
	mapStatesToProps,
	mapDispatchToProps
)(WithErrorHandler(BurgerBuilder, axios));
