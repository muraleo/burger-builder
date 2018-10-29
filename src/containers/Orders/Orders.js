import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-db";
import withErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {
	// state = {
	// 	loading: true,
	// 	orders: []
	// };
	componentDidMount() {
		this.props.onOrderFetch(this.props.token);
	}
	render() {
		// console.log(this.props.order);
		const orderContent = this.props.loading ? (
			<Spinner />
		) : (
			<div>
				{this.props.order.map(order => (
					<Order
						key={order.id}
						ingredients={order.ingredients}
						price={+order.price}
					/>
				))}
			</div>
		);
		return orderContent;
	}
}

const mapStateToProps = state => {
	return {
		order: state.order.order,
		loading: state.order.loading,
		token: state.auth.token
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onOrderFetch: token => dispatch(actions.fetchOrder(token))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(Orders, axios));
