import { page_register } from '@context';
import Register from '@page/register';

const NextPage = () => {
	return <Register />;
};

export default NextPage;

NextPage.getLayout = function getLayout(page) {
	return <page_register.Provider>{page}</page_register.Provider>;
};
