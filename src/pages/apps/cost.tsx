import { page_cost } from '@context';
import Cost from '@page/apps/cost';

const NextPage = () => {
	return <Cost />;
};

export default NextPage;

NextPage.getLayout = function getLayout(page) {
	return (
		// <MainTemplate>
		<page_cost.Provider>{page}</page_cost.Provider>
		// </MainTemplate>
	);
};
