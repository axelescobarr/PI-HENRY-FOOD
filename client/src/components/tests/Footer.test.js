import React from "react";
import '@testing-library/jest-dom/extend-expect';
import { render } from "@testing-library/react";
import Footer from "../Footer";

test('render content', () => {
    const component = render(<Footer/>)
    console.log(component)
})
test('render text', () => {
    const component = render(<Footer/>)
    component.getByText('ALL RIGHT RESERVED. AXEL ESCOBAR DEVELOPER');
})

