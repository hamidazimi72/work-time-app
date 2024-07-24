export type PureFormProps = {
	children?: any;
	boxProps?: React.HTMLAttributes<HTMLFormElement>;
};

export const PureForm: React.FC<PureFormProps> = ({
	children,
	// box Control
	boxProps,
}) => {
	return (
		<form {...boxProps} onSubmit={boxProps?.onSubmit ? boxProps.onSubmit : (e) => e.preventDefault()}>
			{children}
		</form>
	);
};

export default PureForm;
