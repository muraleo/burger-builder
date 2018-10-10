import React, { Component } from "react";
import AUX from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-db";
import Spinner from "../../components/UI/Spinner/Spinner";
import WithErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";

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
		ingredients: null,
		totalPrice: 4.0,
		purchasable: true,
		purchasing: false,
		loading: false,
		error: false
	};

	componentDidMount() {
		axios
			.get("https://leo-burger-builder.firebaseio.com/ingredients.json")
			.then(res => {
				console.log(res);
				this.setState({ ingredients: res.data });
			})
			.catch(err => {
				this.setState({ error: true });
			});
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
		this.setState({ loading: true });
		const order = {
			ingredients: this.state.ingredients,
			price: this.state.totalPrice,
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
		console.log(order);

		axios
			.post("/order.json", order)
			.then(response => {
				console.log(response);
				this.setState({ loading: false, purchasing: false });
			})
			.catch(err => {
				this.setState({ loading: false, purchasing: false });
			});
	};

	render() {
		const disabledInfo = { ...this.state.ingredients };
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}

		let orderSummary = null;
		let burger = this.state.error ? (
			<p>Ingredient can not be loaded!</p>
		) : (
			<Spinner />
		);
		if (this.state.ingredients) {
			burger = (
				<AUX>
					<Burger ingredients={this.state.ingredients} />
					<BuildControls
						ingredientAdded={this.addIngredientHandler}
						ingredientRemoved={this.removeIngredientHandler}
						disabledInfo={disabledInfo}
						totalPrice={this.state.totalPrice}
						purchasable={this.state.purchasable}
						ordered={this.updatePurchaseHandler}
					/>
				</AUX>
			);

			orderSummary = (
				<OrderSummary
					ingredients={this.state.ingredients}
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

export default WithErrorHandler(BurgerBuilder, axios);
