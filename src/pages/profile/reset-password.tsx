import { page_profile } from '@context';
import ResetPassword from '@page/profile/resetPassword';

const NextPage = () => {
	return <ResetPassword />;
};

export default NextPage;

NextPage.getLayout = function getLayout(page) {
	return <page_profile.Provider>{page}</page_profile.Provider>;
};
