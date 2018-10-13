import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import CheckoutSummary from "./containers/Checkout/Checkout";

class App extends Component {
	render() {
		return (
			<div className="App">
				<Layout>
					<BurgerBuilder />
					<CheckoutSummary />
				</Layout>
			</div>
		);
	}
}

export default App;
