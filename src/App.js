import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import CheckoutSummary from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";

class App extends Component {
	componentDidMount = () => {
		this.props.onTryAutoLogin();
	};
	render() {
		return (
			<div className="App">
				<Layout>
					<Switch>
						<Route path="/checkout" component={CheckoutSummary} />
						<Route path="/orders" component={Orders} />
						<Route path="/auth" component={Auth} />
						<Route path="/logout" component={Logout} />
						<Route path="/" exact component={BurgerBuilder} />
					</Switch>
				</Layout>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onTryAutoLogin: () => dispatch(actions.authCheckState())
	};
};

export default connect(
	null,
	mapDispatchToProps
)(App);
