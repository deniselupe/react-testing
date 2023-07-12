type GreetProps = {
	name?: string;
};

export function Greet(props: GreetProps) {
	return <div>Hello {props.name}</div>;
}