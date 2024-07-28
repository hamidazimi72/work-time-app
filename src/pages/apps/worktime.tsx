import { page_worktime } from '@context';
import Worktime from '@page/apps/worktime';
import { DashboardTemplate } from '@template';

const NextPage = () => {
	return <Worktime />;
};

export default NextPage;

NextPage.getLayout = function getLayout(page) {
	return (
		<DashboardTemplate>
			<page_worktime.Provider>{page}</page_worktime.Provider>
		</DashboardTemplate>
	);
};
