import { page_worktime } from '@context';
import Task from '@page/apps/task';

const NextPage = () => {
	return <Task />;
};

export default NextPage;

NextPage.getLayout = function getLayout(page) {
	return (
		// <MainTemplate>
		<page_worktime.Provider>{page}</page_worktime.Provider>
		// </MainTemplate>
	);
};
