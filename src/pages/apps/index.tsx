import { page_worktime } from '@context';
import Apps from '@page/apps';
import { DashboardTemplate } from '@template';

const NextPage = () => {
	return <Apps />;
};

export default NextPage;

NextPage.getLayout = function getLayout(page) {
	return (
		<DashboardTemplate>
			<page_worktime.Provider>{page}</page_worktime.Provider>
		</DashboardTemplate>
	);
};
