import React from "react";
import Item from "./Item/Item";
import classes from "./Items.module.css";

const items = props => (
	<ul className={classes.Items}>
		<Item link="/">Burger Builder</Item>
		<Item link="/orders">Orders</Item>
		{!props.isAuth ? (
			<Item link="/auth">Login</Item>
		) : (
			<Item link="/logout">Logout</Item>
		)}
	</ul>
);

export default items;
