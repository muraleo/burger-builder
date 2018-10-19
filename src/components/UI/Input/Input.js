import React from "react";
import classes from "./Input.module.css";

const Input = props => {
	let inputElement = null;
	switch (props.elementtype) {
		case "input":
			inputElement = (
				<input
					className={classes.InputElement}
					{...props.elementconfig}
					onChange={props.changed}
				/>
			);
			break;
		case "textarea":
			inputElement = (
				<textarea className={classes.InputElement} {...props} />
			);
			break;
		case "select":
			inputElement = (
				<select
					className={classes.InputElement}
					value={props.value}
					onChange={props.changed}
				>
					{props.elementconfig.options.map(e => (
						<option key={e} value={e}>
							{e}
						</option>
					))}
				</select>
			);
			break;
		default:
			inputElement = (
				<input className={classes.InputElement} {...props} />
			);
	}
	return (
		<div className={classes.Input}>
			<label className={classes.Label}>{props.label}</label>
			{inputElement}
		</div>
	);
};

export default Input;
