import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-db";
import withErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";

class Orders extends Component {
	state = {
		loading: true,
		orders: []
	};
	componentDidMount() {
		axios
			.get("/order.json")
			.then(res => {
				const fetchedOrders = [];
				for (let key in res.data) {
					fetchedOrders.push({
						id: key,
						...res.data[key]
					});
				}
				// console.log(fetchedOrders);
				this.setState({ loading: false, orders: fetchedOrders });
			})
			.catch(err => {
				this.setState({ loading: false });
			});
	}
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
