/*
	Code Coverage
	
	A metrics that can help you understand how much of your
	software code is tested.
	
	It's a very useful metric that can help you access the quality 
	of your test suite.
	
	Here is a list of some common metrics that you might see mentioned 
	in your coverage reports.
	
		- Statement Coverage: How many of the statements in the software code 
		  have been executed.
		- Branches Coverage: How many of the branches of the control structures 
		  (if statements for instance) have been executed.
		- Function Coverage: How many of the functions defined have been called.
		- Line Coverage: How many lines of source code have been tested.
		
		
	Now what is great about CRA and Jest is that with 0 configuration, you 
	can request test coverage information to be collected and recorded in 
	the output.
	
	Let's learn how to obtain code coverage report in VSCode.
	
	-----
	
	Let's begin by making a new script in package.json.
	
	We will call the new script 'coverage':
		"coverage": "npm run test -- --coverage"
		
	We are basically extending the "test" script. The reason for this is 
	because coverage generally takes time, and you don't want that as part of 
	your regular test script. 
	
	Now run your new script "npm run coverage", and we see a table 
	as part of the output.
	
	
		No tests found related to files changed since last commit.
		Press `a` to run all tests, or run Jest with `--watchAll`.
		----------|---------|----------|---------|---------|-------------------
		File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
		----------|---------|----------|---------|---------|-------------------
		All files |       0 |        0 |       0 |       0 |                   
		----------|---------|----------|---------|---------|-------------------

		Watch Usage
		 › Press a to run all tests.
		 › Press f to run only failed tests.
		 › Press q to quit watch mode.
		 › Press p to filter by a filename regex pattern.
		 › Press t to filter by a test name regex pattern.
		 › Press Enter to trigger a test run.
		 
	
	However, the table is empty and we see no test found related to files changed 
	since last commit. 
	
	For coverage, what we need is to watch all files and not just the changed files.
	
	To fix this, we add the "--watchAll" option to the "coverage" script.
	
	
		"coverage": "npm test -- --coverage --watchAll"
		
	
	If we re-run "npm run coverage", we can now see a more meaningful report. 
	
	
		PASS  src/App.test.tsx
		PASS  src/components/greet/greet.test.tsx
		----------------------|---------|----------|---------|---------|-------------------
		File                  | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
		----------------------|---------|----------|---------|---------|-------------------
		All files             |   15.38 |        0 |      50 |   15.38 |                   
		 src                  |    8.33 |        0 |   33.33 |    8.33 |                   
		  App.tsx             |     100 |      100 |     100 |     100 |                   
		  index.tsx           |       0 |      100 |     100 |       0 | 7-19              
		  reportWebVitals.ts  |       0 |        0 |       0 |       0 | 3-10              
		 src/components/greet |     100 |      100 |     100 |     100 |                   
		  greet.tsx           |     100 |      100 |     100 |     100 |                   
		----------------------|---------|----------|---------|---------|-------------------

		Test Suites: 2 passed, 2 total
		Tests:       3 passed, 3 total
		Snapshots:   0 total
		Time:        2.362 s
		Ran all test suites.

		Watch Usage
		 › Press f to run only failed tests.
		 › Press o to only run tests related to changed files.
		 › Press q to quit watch mode.
		 › Press p to filter by a filename regex pattern.
		 › Press t to filter by a test name regex pattern.
		 › Press Enter to trigger a test run.
		 
	
	Let's go over the different columns:
		- First Column: File name
		- Second Column: Statement Coverage Percentage
		- Third Column: Branch Coverage Percentage
		- Fourth Column: Functions Coverage Percentage
		- Fifth Column: Lines Coverage Percentage
		- Sixth Column: Jest also pinpoints the line numbers which are not covered by any test.
		  In our table, the numbers you see correspond to the file in the first column. Generally, 
		  you want to address the red numbers here by writing tests that will turn then green.
		  
	Now although we could write tests for index.tsx, and report reportWebVitals.ts, we know for a fact 
	that those tests will not add any value. 
	
	What we would like to do in this case is to ignore these two files. 
	
	In fact, since most of our code in the series is going to be within the /components folder, 
	we will ask Jest to cover only that folder for the report.
	
	-----
	
	Specify what paths to report coverage for
	
	We can use a glob pattern with a "--collectCoverageFrom" option.
	
	
		"coverage": "npm test -- --coverage --watchAll --collectCoverageFrom='src/components/**\/*.{ts,tsx}'"
		
	
    So in the /components folder, collect coverage from files that end with a .ts or .tsx extension.

    If you now save the file and re-run "npm run coverage", we see only greet.tsx file, and the coverage 
    is 100%.
    
    
        PASS  src/App.test.tsx
        PASS  src/components/greet/greet.test.tsx
        -----------|---------|----------|---------|---------|-------------------
        File       | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
        -----------|---------|----------|---------|---------|-------------------
        All files  |     100 |      100 |     100 |     100 |                   
            greet.tsx |     100 |      100 |     100 |     100 |                   
        -----------|---------|----------|---------|---------|-------------------

        Test Suites: 2 passed, 2 total
        Tests:       3 passed, 3 total
        Snapshots:   0 total
        Time:        2.151 s
        Ran all test suites.

        Watch Usage
            › Press f to run only failed tests.
            › Press o to only run tests related to changed files.
            › Press q to quit watch mode.
            › Press p to filter by a filename regex pattern.
            › Press t to filter by a test name regex pattern.
            › Press Enter to trigger a test run.
            
    
    Of course, when dealing with larger applications, you're bound to have files that don't 
    need a test. 
    
    For example, in the /greet folder, let us create a "greet.types.ts" file.
    We will copy the GreetProps type from "greet.tsx" and paste it into the new 
    "greet.types.ts". We will then export GreetProps from "greet.types.ts" and import 
    GreetProps into "greet.tsx"
    
    
        #/greet/greet.types.ts
        export type GreetProps = {
            name?: string;
        };
        
        #/greet/greet.tsx
        import { GreetProps } from "./greet.types";
        
        export function Greet(props: GreetProps) {
            return <div>Hello {props.name}</div>;
        }
        
    
    If you now, re-run the script, you will see the newly added file making it 
    into the coverage report with 0 coverage.
    
    
            PASS  src/App.test.tsx
            PASS  src/components/greet/greet.test.tsx
        ----------------|---------|----------|---------|---------|-------------------
        File            | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
        ----------------|---------|----------|---------|---------|-------------------
        All files       |     100 |      100 |     100 |     100 |                   
            greet.tsx      |     100 |      100 |     100 |     100 |                   
            greet.types.ts |       0 |        0 |       0 |       0 |                   
        ----------------|---------|----------|---------|---------|-------------------

        Test Suites: 2 passed, 2 total
        Tests:       3 passed, 3 total
        Snapshots:   0 total
        Time:        2.153 s
        Ran all test suites.

        Watch Usage
            › Press f to run only failed tests.
            › Press o to only run tests related to changed files.
            › Press q to quit watch mode.
            › Press p to filter by a filename regex pattern.
            › Press t to filter by a test name regex pattern.
            › Press Enter to trigger a test run.
    
    
    To fix this, we can ask Jest to ignore the file. So back in package.json we update 
    the script.
    
    
        "coverage": "npm test -- --coverage --watchAll --collegeCoverageFrom='src/components/**\/*.{ts,tsx}' --collectCoverageFrom='!src/components/**\/*.{types,stories,constants,test,spec}.{ts,tsx}'"
        
    
    So other than types, we are also ignoring stories, constants, test and spect, since none of these files require a test to be written.
    
    Save the file, re-run "npm run coverage", and we see just the 
    "greet.tsx" with 100% coverage.
    
    
        PASS  src/components/greet/greet.test.tsx
        PASS  src/App.test.tsx
        -----------|---------|----------|---------|---------|-------------------
        File       | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
        -----------|---------|----------|---------|---------|-------------------
        All files  |     100 |      100 |     100 |     100 |                   
            greet.tsx |     100 |      100 |     100 |     100 |                   
        -----------|---------|----------|---------|---------|-------------------

        Test Suites: 2 passed, 2 total
        Tests:       3 passed, 3 total
        Snapshots:   0 total
        Time:        1.631 s, estimated 2 s
        Ran all test suites.

        Watch Usage
            › Press f to run only failed tests.
            › Press o to only run tests related to changed files.
            › Press q to quit watch mode.
            › Press p to filter by a filename regex pattern.
            › Press t to filter by a test name regex pattern.
            › Press Enter to trigger a test run.
            
        
    Next, let's cover coverage threshold.
    
    -----
    
    Coverage Threshold
    
    With Jest, it is possible to specify a minimum threshfold enforcement 
    for coverage reports.
    
    If thresholds aren't met, Jest with fail.
    
    For example, we can add the following Jest configuration in "package.json".
    
    
        "jest": {
            "coverageThreshold": {
                "global": {
                    "branches": 80,
                    "functions": 80,
                    "lines": 80,
                    "statements": -10
                }
            }
        }
        
    
    With this configuration, Jest will fail if there's less than 80% branch, line, and function 
    coverage, or, if there are more than 10 uncovered statements.
    
    Let's test it out. 
    
    In "greet.test.tsx" we are going to delete the second test.
    
    If we now save the file, we still see that the coverage remains at 100%.
    
    Let's now go to "greet.tsx" and add a branching logic when rendering the 
    "name" prop.
    
    
        import { GreetProps } from "./greet.types";

        export function Greet(props: GreetProps) {
            return <div>Hello {props.name ? props.name : 'Guest'}</div>;
        }
        
    
    If you now save the "greet.tsx" file, we see our first test now fails.
    
    
        -----------|---------|----------|---------|---------|-------------------
        File       | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
        -----------|---------|----------|---------|---------|-------------------
        All files  |     100 |       50 |     100 |     100 |                   
            greet.tsx |     100 |       50 |     100 |     100 | 4                 
        -----------|---------|----------|---------|---------|-------------------
        Test Suites: 1 failed, 1 passed, 2 total
        Tests:       1 failed, 1 passed, 2 total
        Snapshots:   0 total
        Time:        1.111 s
        Ran all test suites.
        
        
    Let's change our string to regex in the first test.
    

        # src/greet/greet.test.tsx
        test('renders correctly', () => {
            render(<Greet />);
            const textElement = screen.getByText(/Hello/);
            expect(textElement).toBeInTheDocument();
        });
        
        
    This will pass the test, but our branch coverage is still only at 
    50%. 
    
    If we re-run "npm run coverage" to run Jest with the new configurations, you will 
    now see Jest report the error.
    
    
        PASS  src/App.test.tsx
        PASS  src/components/greet/greet.test.tsx
        -----------|---------|----------|---------|---------|-------------------
        File       | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
        -----------|---------|----------|---------|---------|-------------------
        All files  |     100 |       50 |     100 |     100 |                   
            greet.tsx |     100 |       50 |     100 |     100 | 4                 
        -----------|---------|----------|---------|---------|-------------------
        Jest: "global" coverage threshold for branches (80%) not met: 50%

        Test Suites: 2 passed, 2 total
        Tests:       2 passed, 2 total
        Snapshots:   0 total
        Time:        0.841 s, estimated 1 s
        Ran all test suites.
        
        
    In the table, we see that branch coverage is 50% and that line 4 of "greet.tsx" is 
    uncovered.
    
    If we look at "greet.tsx" line 5, you will see that this line contains our ternary 
    operator. Really helpful as you can see.

    Let's bring back the second test to "greet.test.tsx".


        test('renders with a name', () => {
            render(<Greet name="deniselupe" />);
            const textElement = screen.getByText('Hello deniselupe');
            expect(textElement).toBeInTheDocument();
        });
    

    Save the "greet.test.tsx" file with the re-introduced 2nd test, and Jest will 
    now show that Branch Coverage percentage is back at 100%.


        PASS  src/App.test.tsx
        PASS  src/components/greet/greet.test.tsx
        -----------|---------|----------|---------|---------|-------------------
        File       | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
        -----------|---------|----------|---------|---------|-------------------
        All files  |     100 |      100 |     100 |     100 |                   
        greet.tsx |     100 |      100 |     100 |     100 |                   
        -----------|---------|----------|---------|---------|-------------------

        Test Suites: 2 passed, 2 total
        Tests:       3 passed, 3 total
        Snapshots:   0 total
        Time:        0.889 s, estimated 1 s
        Ran all test suites.

    
    -----
    
    Last but not least, we would like to mention that Jest also generates a 
    HTML file of your coverage report.
    
    In the "coverage/lcov-report/" folder, there is an "index.html" file.
    
    If you open that file, you will see the same report, but with some CSS applied.
    
    If you select the file, it also highlights the uncovered branch.
    
    One thing we would like to state at this point, is not to focus too much on 
    getting 100% coverage.
    
    Full code coverage does not guarantee that you've written good tests 
    covering critical parts of your application.
    
    With that being said, it is generally accepted that 80% coverage 
    is a good goal to aim for, and you should make code coverage part of 
    your Continuous Integration pipeline. 
    
    Now that was a lot, so let us quickly summarize what we went over 
    in this lesson.
    
    We started by understanding that Code Coverage is a metric that can 
    help understand how much the software code is tested. 
    
    We learned about the Jest --coverage option, to generate the report.
    
    We also used the --watchAll to generate coverage for all tests in the project.
    
    We were also able to specify which files we should or should not collect code 
    coverage from, using the --collectCoverageFrom flag.
    
    We also learned how to set coverage threshold in "package.json".
    
    Jest will fail if the coverage does not meet the threshold requirements.
    
    
    -----
    
    Code Coverage is very important from a CI/CD point-of-view, so please 
    make sure you got a good idea of how to generate it with Jest.
*/

import { render, screen } from '@testing-library/react';
import { Greet } from './greet';

describe('<Greet />',  () => {
    test('renders correctly', () => {
        render(<Greet />);
        const textElement = screen.getByText(/Hello/);
        expect(textElement).toBeInTheDocument();
    });
    
    test('renders with a name', () => {
        render(<Greet name="deniselupe" />);
        const textElement = screen.getByText('Hello deniselupe');
        expect(textElement).toBeInTheDocument();
    });
});
