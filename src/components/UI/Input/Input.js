import React from "react";
import classes from "./Input.module.css";

const Input = props => {
	let inputElement = null;

	let inputClasses = [classes.InputElement];
	if (props.invalid && props.shouldvalidate && props.touched) {
		inputClasses.push(classes.Invalid);
	}
	let inputClassesStr = inputClasses.join(" ");

	switch (props.elementtype) {
		case "input":
			inputElement = (
				<input
					className={inputClassesStr}
					{...props.elementconfig}
					value={props.value}
					onChange={props.changed}
				/>
			);
			break;
		case "textarea":
			inputElement = <textarea className={inputClassesStr} {...props} />;
			break;
		case "select":
			inputElement = (
				<select
					className={inputClassesStr}
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
				<input
					className={inputClassesStr}
					{...props.elementconfig}
					value={props.value}
					onChange={props.changed}
				/>
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
