import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../../../context/GlobalProvider';
import { AuthContext } from '../../../context/AuthProvider';
import {
	Container,
	IconBox,
	Inner,
	InnerBox,
	LightText,
	ErrorText,
	ErrorBox,
	Mid,
	StrongText,
} from './styles';

import { ImCheckmark } from 'react-icons/im';
import { AiOutlineClose } from 'react-icons/ai';
import { ModalContext } from '../../../context/ModalProvider';
import Button from '../../Button/normal';
const ResponseModal = () => {
	const { responseMessage, setResponseMessage, setListOfBulk } =
		useContext(GlobalContext);
	const { responseDetail, setResponseDetail, setResponseModal } =
		useContext(ModalContext);

	const { setAuthId, setType } = useContext(AuthContext);

	const handleClose = () => {
		setResponseDetail({});
		setResponseModal(false);
		setResponseMessage('');
		setAuthId(null);
		localStorage.removeItem('data');
		localStorage.removeItem('id');
		localStorage.removeItem('type');
		setType(null);
		setListOfBulk([]);
	};

	useEffect(() => {
		if (localStorage.getItem('data')) {
			setResponseDetail(JSON.parse(localStorage.getItem('data')));
			return;
		}
	}, [setResponseDetail]);

	return (
		<>
			<Container>
				<Inner>
					<InnerBox>
						<Mid>
							{responseMessage ===
								'Scheduled Recharge Request Submitted Successfully' && (
								<>
									<IconBox>
										<ImCheckmark color='#124A80' size={24} />
									</IconBox>
									<StrongText>Successful</StrongText>
									{responseDetail && (
										<LightText>
											Your scheduled recharge of &#x20A6;{responseDetail.amount}{' '}
											to {responseDetail.recipient} was completed successfully.
										</LightText>
									)}
								</>
							)}
							{responseMessage === 'Data Success' && (
								<>
									<IconBox>
										<ImCheckmark color='#124A80' size={24} />
									</IconBox>
									<StrongText>Successful</StrongText>
									{responseDetail && (
										<LightText>
											Your scheduled data recharge of {responseDetail.amount} to{' '}
											{responseDetail.recipient} was completed successfully.
										</LightText>
									)}
								</>
							)}
							{responseMessage === 'SUCCESS' && (
								<>
									<IconBox>
										<ImCheckmark color='#124A80' size={24} />
									</IconBox>
									<StrongText>{responseMessage}</StrongText>
									{responseDetail && (
										<LightText>
											Your recharge of &#x20A6;{responseDetail.amount} to{' '}
											{responseDetail.recipient} was completed successfully.
										</LightText>
									)}
								</>
							)}
							{responseMessage === 'Schedule Success' && (
								<>
									<IconBox>
										<ImCheckmark color='#124A80' size={24} />
									</IconBox>
									<StrongText>Success</StrongText>
									{responseDetail && (
										<LightText>
											Your scheduled request was submitted successfully.
										</LightText>
									)}
								</>
							)}
							{responseMessage === 'Delete' && (
								<>
									<IconBox>
										<ImCheckmark color='#124A80' size={24} />
									</IconBox>
									<StrongText>Success</StrongText>
									{responseDetail && (
										<LightText>Beneficiary deleted successfully.</LightText>
									)}
								</>
							)}

							{responseMessage === 'Bene' && (
								<>
									<IconBox>
										<ImCheckmark color='#124A80' size={24} />
									</IconBox>
									<StrongText>Success</StrongText>
									<LightText>Beneficiary credited successfully</LightText>
								</>
							)}

							{responseMessage === 'Data Recharge' && (
								<>
									<IconBox>
										<ImCheckmark color='#124A80' size={24} />
									</IconBox>
									<StrongText>{responseMessage}</StrongText>
									{responseDetail && (
										<LightText>
											Your data recharge of {responseDetail.amount} to{' '}
											{responseDetail.recipient} was completed successfully.
										</LightText>
									)}
								</>
							)}
							{responseMessage === 'Ringo Recharge Successful' && (
								<>
									<IconBox>
										<ImCheckmark color='#124A80' size={24} />
									</IconBox>
									<StrongText>SUCCESS</StrongText>
									{responseDetail && (
										<LightText>
											Your recharge of &#x20A6;{responseDetail.amount} to{' '}
											{responseDetail.recipient} was completed successfully.
										</LightText>
									)}
								</>
							)}
							{responseMessage === 'Ringo Data Recharge Successful' && (
								<>
									<>
										<IconBox>
											<ImCheckmark color='#124A80' size={24} />
										</IconBox>
										<StrongText>Data Recharge Successful</StrongText>
										{responseDetail && (
											<LightText>
												Your data recharge of {responseDetail.amount} to{' '}
												{responseDetail.recipient} was completed successfully.
											</LightText>
										)}
									</>
								</>
							)}
							{responseMessage ===
								'Bulk Recharge Request Submitted Successfully' && (
								<>
									<>
										<IconBox>
											<ImCheckmark color='#124A80' size={24} />
										</IconBox>
										<StrongText>Successful</StrongText>

										<LightText>
											Your bulk request has been submitted successfully
										</LightText>
									</>
								</>
							)}
							{responseMessage === 'Request submitted successfully' && (
								<>
									<>
										<IconBox>
											<ImCheckmark color='#124A80' size={24} />
										</IconBox>
										<StrongText>Successful</StrongText>

										<LightText>
											Your bulk request has been submitted successfully
										</LightText>
									</>
								</>
							)}
							{responseMessage === 'Wallet Successfully Funded' && (
								<>
									<>
										<IconBox>
											<ImCheckmark color='#124A80' size={24} />
										</IconBox>
										<StrongText>Successful</StrongText>

										<LightText>Your wallet has credited successfully</LightText>
									</>
								</>
							)}

							{responseMessage === 'Bulk Excel Successful' && (
								<>
									<>
										<IconBox>
											<ImCheckmark color='#124A80' size={24} />
										</IconBox>
										<StrongText>Successful</StrongText>

										<LightText>
											Bulk Request has been submitted successfully, results will
											be mailed to you
										</LightText>
									</>
								</>
							)}

							{responseMessage === 'Something went wrong, please try again' && (
								<>
									<>
										<ErrorBox>
											<AiOutlineClose color='#DC3545' size={30} />{' '}
										</ErrorBox>
										<ErrorText>Something went wrong</ErrorText>
										<LightText>Please try again later</LightText>{' '}
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

export default ResponseModal;
