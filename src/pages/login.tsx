import { page_login } from '@context';
import Login from '@page/login';

const NextPage = () => {
	return <Login />;
};

export default NextPage;

NextPage.getLayout = function getLayout(page) {
	return <page_login.Provider>{page}</page_login.Provider>;
};
