import { page_register } from '@context';
import Register from '@page/register';
import { SignTemplate } from '@template';

const NextPage = () => {
	return <Register />;
};

export default NextPage;

NextPage.getLayout = function getLayout(page) {
	return (
		<SignTemplate>
			<page_register.Provider>{page}</page_register.Provider>
		</SignTemplate>
	);
};
