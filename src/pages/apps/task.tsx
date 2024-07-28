import { page_task } from '@context';
import Task from '@page/apps/task';
import { DashboardTemplate } from '@template';

const NextPage = () => {
	return <Task />;
};

export default NextPage;

NextPage.getLayout = function getLayout(page) {
	return (
		<DashboardTemplate>
			<page_task.Provider>{page}</page_task.Provider>
		</DashboardTemplate>
	);
};
