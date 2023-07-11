import { render, screen } from '@testing-library/react';
import { Greet } from './greet';

// test() is globally available for a create-react-app project
test('<Greet /> renders correctly', () => {
    // Begin by creating a VDOM of the <Greet /> component against which we test our assertions
    render(<Greet />);

    // Now that we have VDOM, let's check that 'Hello' text is present. For that let's query screen object
    // 'screen' object is provided by @testing-library/react
    // We'll be using screen.getByText() and pass in 'Hello' with no regex
    // We'll assign the value to a variable called 'textElement'
    const textElement = screen.getByText('Hello');

    // Finally we can use the 'expect' method from Jest to test assertion
    // We expect textElement to be in the document which is the VDOM created by render() method
    expect(textElement).toBeInTheDocument();

    // That is pretty much out test
});