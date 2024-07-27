import { page_worktime } from '@context';
import Cost from '@page/apps/cost';

const NextPage = () => {
	return <Cost />;
};

export default NextPage;

NextPage.getLayout = function getLayout(page) {
	return (
		// <MainTemplate>
		<page_worktime.Provider>{page}</page_worktime.Provider>
		// </MainTemplate>
	);
};
