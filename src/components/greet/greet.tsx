import { GreetProps } from "./greet.types";

export function Greet(props: GreetProps) {
	return <div>Hello {props.name? props.name : 'Hello'}</div>;
}