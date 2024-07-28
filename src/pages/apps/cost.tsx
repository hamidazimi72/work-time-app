import { page_cost } from '@context';
import Cost from '@page/apps/cost';
import { DashboardTemplate } from '@template';

const NextPage = () => {
	return <Cost />;
};

export default NextPage;

NextPage.getLayout = function getLayout(page) {
	return (
		<DashboardTemplate>
			<page_cost.Provider>{page}</page_cost.Provider>
		</DashboardTemplate>
	);
};
