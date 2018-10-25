import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-db";
import withErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";

class Orders extends Component {
	state = {
		loading: true,
		orders: []
	};
	componentDidMount() {}
	render() {
		return (
			<div>
				{this.state.orders.map(order => (
					<Order
						key={order.id}
						ingredients={order.ingredients}
						price={+order.price}
					/>
				))}
			</div>
		);
	}
}

export default withErrorHandler(Orders, axios);
