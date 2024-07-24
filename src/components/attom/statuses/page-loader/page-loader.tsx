import { ContentLoader, ContentLoaderProps } from '@attom';

export const PageLoader: React.FC<ContentLoaderProps> = ({ ...props }) => {
	return <ContentLoader boxPosition='fixed' boxBgColor='bg-[#fff8]' {...props} />;
};

PageLoader;
