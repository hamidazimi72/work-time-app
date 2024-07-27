import { page_worktime } from '@context';
import Apps from '@page/apps';

const NextPage = () => {
	return <Apps />;
};

export default NextPage;

NextPage.getLayout = function getLayout(page) {
	return (
		// <MainTemplate>
		<page_worktime.Provider>{page}</page_worktime.Provider>
		// </MainTemplate>
	);
};
