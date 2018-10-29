import React from "react";
import { configure, shallow } from "enzyme"; // shallow is popular to render no child component
import Adapter from "enzyme-adapter-react-16";
import Items from "./Items";
import Item from "./Item/Item";

configure({ adapter: new Adapter() });

describe("<Item />", () => {
	let wrapper = null;

	beforeEach(() => {
		wrapper = shallow(<Items />);
	});
	it("should render two Item components in navbar if user not authenticated", () => {
		expect(wrapper.find(Item)).toHaveLength(2);
	});

	it("should render three Item components in navbar when user authenticated", () => {
		wrapper.setProps({ isAuth: true });
		expect(wrapper.find(Item)).toHaveLength(3);
	});
});
