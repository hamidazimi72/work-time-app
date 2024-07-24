import { PureModal, PureModalProps } from '@attom';

export const SideModal: React.FC<PureModalProps> = ({ ...props }) => {
	return <PureModal {...props} sideModal />;
};

export default SideModal;
