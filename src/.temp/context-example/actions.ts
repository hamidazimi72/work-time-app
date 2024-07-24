import { useContext } from '.';

export const useActions = () => {
	const { state, setState, initState, overWrite } = useContext();

	//--------------------* Start Actions *--------------------//

	const exampleAction = async (parameters?: Action_callbacks & {}) => {
		// setState((PS) => ({ ...PS }));
		// overWrite({ scope: 'scope1', value: { name: "name"} });
	};

	//--------------------* End Action  *--------------------//

	return { exampleAction };
};
