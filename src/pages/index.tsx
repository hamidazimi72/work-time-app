import { MainTemplate } from '@template';
import { HealthInsurance } from '@page/health-insurance';
import { page_healthInsurance } from '@context';

const NextPage = () => {
	return <HealthInsurance />;
};

export default NextPage;

NextPage.getLayout = function getLayout(page) {
	return (
		<MainTemplate>
			<page_healthInsurance.Provider>{page}</page_healthInsurance.Provider>
		</MainTemplate>
	);
};
