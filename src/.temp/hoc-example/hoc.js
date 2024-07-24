export const withExample = (Component) => {
	const auth = false;

	if (auth) return (props) => <Component {...props} />;
	else return (props) => <Component {...props} />;
};

export default withExample;
