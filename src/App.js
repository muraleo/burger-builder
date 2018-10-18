import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import CheckoutSummary from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import { Route, Switch } from "react-router-dom";

class App extends Component {
	render() {
		return (
			<div className="App">
				<Layout>
					<Switch>
						<Route path="/checkout" component={CheckoutSummary} />
						<Route path="/orders" component={Orders} />
						<Route path="/" exact component={BurgerBuilder} />
					</Switch>
				</Layout>
			</div>
		);
	}
}

export default App;
