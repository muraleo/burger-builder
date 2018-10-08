import React, { Component } from "react";
import AUX from "../../hoc/Aux";
import classes from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

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
				<Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
				<SideDrawer
					open={this.state.showSideDrawer}
					closed={this.sideDrawerClosedHandler}
				/>
				<main className={classes.Content}>{this.props.children}</main>
			</AUX>
		);
	}
}

export default Layout;
