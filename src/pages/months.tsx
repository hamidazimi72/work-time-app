import { page_months } from '@context';
import Months from '@page/months';

const NextPage = () => {
	return <Months />;
};

export default NextPage;

NextPage.getLayout = function getLayout(page) {
	return (
		// <MainTemplate>
		<page_months.Provider>{page}</page_months.Provider>
		// </MainTemplate>
	);
};
