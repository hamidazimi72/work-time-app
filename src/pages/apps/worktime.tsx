import { page_worktime } from '@context';
import Months from '@page/months';

const NextPage = () => {
	return <Months />;
};

export default NextPage;

NextPage.getLayout = function getLayout(page) {
	return (
		// <MainTemplate>
		<page_worktime.Provider>{page}</page_worktime.Provider>
		// </MainTemplate>
	);
};
