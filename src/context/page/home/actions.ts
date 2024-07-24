import { useContext } from '.';

export const useActions = () => {
	const { state, setState, initState, overWrite } = useContext();

	//--------------------* Start Actions *--------------------//

	const exampleAction = async (parameters?: Action_callbacks & {}) => {};

	//--------------------* End Action  *--------------------//

	return { exampleAction };
};
