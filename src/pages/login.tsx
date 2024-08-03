import { page_login } from '@context';
import Login from '@page/login';
import { SignTemplate } from '@template';

const NextPage = () => {
	return <Login />;
};

export default NextPage;

NextPage.getLayout = function getLayout(page) {
	return (
		<SignTemplate>
			<page_login.Provider>{page}</page_login.Provider>
		</SignTemplate>
	);
};
