import React, { Component } from "react";
import AUX from "../../hoc/Aux/Aux";
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import { connect } from "react-redux";

class Layout extends Component {
	state = {
		showSideDrawer: false
	};

	sideDrawerClosedHandler = () => {
		this.setState({
			showSideDrawer: false
		});
	};

	sideDrawerToggleHandler = () => {
		this.setState(preState => {
			return { showSideDrawer: !preState.showSideDrawer };
		});
	};

	render() {
		return (
			<AUX>
				<Toolbar
					isAuth={this.props.isAuth}
					drawerToggleClicked={this.sideDrawerToggleHandler}
				/>
				<SideDrawer
					isAuth={this.props.isAuth}
					open={this.state.showSideDrawer}
					closed={this.sideDrawerClosedHandler}
				/>
				<main className={classes.Content}>{this.props.children}</main>
			</AUX>
		);
	}
}

const mapStateToProps = state => {
	return {
		isAuth: state.auth.token !== null
	};
};

const mapDispatchToProps = dispatch => {
	return {};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Layout);
