import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
	{ label: "Salad", type: "salad" },
	{ label: "Bacon", type: "bacon" },
	{ label: "Cheese", type: "cheese" },
	{ label: "Meat", type: "meat" }
];
const buildControls = props => (
	<div className={classes.BuildControls}>
		<p>Current Price: {props.totalPrice.toFixed(2)}</p>
		{controls.map(ctrl => {
			return (
				<BuildControl
					key={ctrl.label}
					label={ctrl.label}
					added={() => {
						props.ingredientAdded(ctrl.type);
					}}
					removed={() => {
						props.ingredientRemoved(ctrl.type);
					}}
					disabled={props.disabledInfo[ctrl.type]}
				/>
			);
		})}
		<button
			onClick={props.ordered}
			className={classes.OrderButton}
			disabled={props.purchasable}
		>
			{props.isAuth ? "ORDER NOW" : "SIGN IN TO ORDER"}
		</button>
	</div>
);

export default buildControls;
