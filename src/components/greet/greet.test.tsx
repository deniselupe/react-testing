/*
	In the previous lesson we created our very first 
	automated test.
	
	In this lesson let's created another automated test, 
	but this time using a diffferent approach.
	
	And that different approach that we are going to follow is called 
	Test Driven Development, or, TDD for short.
	
	TDD is something you might come across when you learn about testing,
	so we wanted to introduce you to this topic.
	
	-----
	
	Test Driven Development (TDD)
	
	Is a software development process where you write tests 
	before you write the software code.
	
	Once the tests have been written, you write the software code 
	to ensure that the tests pass.
	
	This process involves 3 phases:
		1. Create tests that verify the functionality of a specific feature.
		   All tests are bound to fail at this point.
		2. Write software code that will run the tests successfully when re-executed.
		3. Refactor the code for optimization while ensuring the tests continue to pass.
		
	This type of testing is also called red-green testing as all tests go from a red/failed 
	state to a green/passed state.
	
	If this is clear, let's go back to the code and follow a TDD approach to implement a 
	<Greet /> component.
	
	-----
	
	We are reusing the files in `/src/components/greet/*`.
	
	First, make sure to remove all the code from greet.test.tsx and greet.tsx, start with a clean state.
	
    Requirements for the component:
        - <Greet /> should render the text 'Hello'.
        - The <Greet /> should render 'Hello' followed by the name, if a name is passed in to the component. 

    Let us now begin out TDD approach.

    ---

    Phase One

    The first phase is to write the tests that meet the requirements.

    Within the greet.test.tsx, we will implement the following test:

        import { render, screen } from '@testing-library/react';
        import { Greet } from './greet';

        test('<Greet /> renders correctly', () => {
            render(<Greet />);
            
            const textElement = screen.getByText('Hello');

            expect(textElement).toBeInTheDocument();
        });

    This test will address our first requirement.

    Now we write our test for the second requirement:

        test('<Greet /> renders with a name', () => {
            render(<Greet name="deniselupe" />);

            const textElement = screen.getByText('Denise deniselupe');

            expect(textElement).toBeInTheDocument();
        });

    We have no written tests to cover the functionality of the <Greet /> 
    component.
    
    If we save the file and run jest, both tests will fail as expected. 

    And this is the part of the red-green testing.

    -----

    Phase Two

    We are going to write the code to pass these tests.

    Back in the greet.tsx file, to pass the first test, we return a <div> tag with 
    the text 'Hello'.

        export function Greet() {
            return <div>Hello</div>;
        }

    As soon as we save the file, Jest automatically runs the tests again, and 
    we now see that one test failed and one test passed.

    If you look at the output of the test, you will see that the `<Greet /> renders 
    correctly' test passed. 

    Let's now focus on the second test. 

    To make sure this works, we still need to pass in a 'name' prop to the <Greet />
    component. 

    Since we are using TypeScript, let's begin by defining the 'props' type.

        type GreetProps = {
            name: string;
        };

    And now we can specify the props for the <Greet /> component.

        export function Greet(props: GreetProps) {
            return <div>Hello {props.name}</div>;
        }

    If we save the file, Jest re-runs the test, and we will see that both tests 
    pass now.

    However, the test file still flags an error.

    And this is a TypeScript error. If you hover over the error, the 
    error will say:

    "Property 'name' is missing in type '{}' but required in type 'GreetProps'."

    To fix this, in GreetProps, make 'name' field optional.

        type GreetProps = {
            name?: string;
        };

    We now have everything in green. 

    This is the green part of red-green testing.

    Now of course, TypeScript flagging errors is not part of Unit Testing, 
    but it is more of a compile time testing.

    That completes Phase Two of TDD.

    -----

    Phase Three

    For Phase Three, we can refactor the software code if we need to, 
    while ensuring the tests pass. 

    Since our code is already as simple as it can be, phase three is optional.

    -----

    Conclusion

    We have successfully written your second React test.

    To quickly review, we learned that TDD is a software development process 
    where we write tests first before writing software code.

    We also learned the 3 phases of TDD:
        1. Writing tests
        2. Writing software code
        3. Refactoring while stil passing tests

    For our example, we wrote 2 tests to meet the given requirements.

    We used objects and methods we used in the previous lessons like
    test(), render(), screen, and expect(). 

    When the test failed, we proceeded to write the software code.

    First, the 'Hello' message, then props object with 'name'. 

    We also ensured that 'name' is optional to pass the compile time checks 
    that TypeScript takes care of.
*/

import { render, screen } from '@testing-library/react';
import { Greet } from './greet';

test('<Greet /> renders correctly', () => {
    render(<Greet />);
    const textElement = screen.getByText('Hello');
    expect(textElement).toBeInTheDocument();
});

test('<Greet /> renders with a name', () => {
    render(<Greet name="deniselupe" />);
    const textElement = screen.getByText('Hello deniselupe');
    expect(textElement).toBeInTheDocument();
});
