import { page_task } from '@context';
import Task from '@page/apps/task';

const NextPage = () => {
	return <Task />;
};

export default NextPage;

NextPage.getLayout = function getLayout(page) {
	return (
		// <MainTemplate>
		<page_task.Provider>{page}</page_task.Provider>
		// </MainTemplate>
	);
};
