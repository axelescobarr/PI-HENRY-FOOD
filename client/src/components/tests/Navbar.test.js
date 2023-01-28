import React from "react";
import '@testing-library/jest-dom/extend-expect';
import { render } from "@testing-library/react";
import Navbar from "../Navbar"


test('render content', () => {
    const component = render(<Navbar/>)
    console.log(component)
})

test('render logo', () => {
    const component = render(<Navbar/>)
    component.getByText('WIKI');
})
test('render logo', () => {
    const component = render(<Navbar/>)
    component.getByText('FOODS');
})
test('render logo', () => {
    const component = render(<Navbar/>)
    component.getByAltText('github');
})
test('render logo', () => {
    const component = render(<Navbar/>)
    component.getByAltText('linkedin');
})