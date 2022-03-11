import React, { useContext } from 'react';
import { ModalContext } from '../../../context/ModalProvider';
import Button from '../../Button/normal';
import {
	Container,
	ErrorBox,
	ErrorText,
	Inner,
	InnerBox,
	LightText,
	Mid,
} from '../ResponseModal/styles';
import { AiOutlineClose } from 'react-icons/ai';

const ErrorModal = () => {
	const { setErrorModal, errorMessage, setErrorMessage } =
		useContext(ModalContext);

	const handleClose = () => {
		setErrorModal(false);
		setErrorMessage('');
	};
	return (
		<>
			<Container>
				<Inner>
					<InnerBox>
						<Mid>
							{errorMessage && (
								<>
									<>
										<ErrorBox>
											<AiOutlineClose color='#DC3545' size={30} />{' '}
										</ErrorBox>
										<ErrorText>Error</ErrorText>
										<LightText>{errorMessage}</LightText>
									</>
								</>
							)}
							{errorMessage ===
								'Error processing Payment : (INSUFFICIENT FUNDS)' && (
								<>
									<>
										<ErrorBox>
											<AiOutlineClose color='#DC3545' size={30} />{' '}
										</ErrorBox>
										<ErrorText>INSUFFICIENT FUNDS</ErrorText>
										<LightText>
											Top up your account to perform your transaction
										</LightText>
									</>
								</>
							)}
						</Mid>
						<Button onClick={handleClose} name='Close' />
					</InnerBox>
				</Inner>
			</Container>
		</>
	);
};

export default ErrorModal;
