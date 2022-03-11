import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { GlobalContext } from '../../../../../context/GlobalProvider';
import { GrFormClose } from 'react-icons/gr';
import {
	makeBulkRecharge,
	makeScheduledRecharge,
} from '../../../../../helper/requests';
import { ModalContext } from '../../../../../context/ModalProvider';
import { convertDate } from '../../../../../utils/dateformat';
const Container = styled.form`
	background: var(--light-background);
	margin-top: 50px;
	height: 290px;
	border-radius: 5px;
	padding: 1rem;
`;

const Bottom = styled.div`
	margin-top: 21px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	/* padding: 1rem; */
`;

const SendButton = styled.div`
	/* margin-bottom: 10px; */
`;

const Send = styled.button`
	outline: none;
	border: none;
	cursor: pointer;
	background: var(--btn-color);
	color: var(--white);
	padding: 0.5rem 1.6rem;
	border-radius: 3px;

	&.not-allowed {
		opacity: 0.5;
		cursor: not-allowed;
	}

	&:hover {
		opacity: 0.9;
	}
`;

const TextContainer = styled.div``;

const Inner = styled.div`
	height: 210px;
	overflow-y: scroll;

	&::-webkit-scrollbar {
		width: 6px;
		margin-block: 20px;
	}

	&::-webkit-scrollbar-track {
		background: rgba(18, 74, 128, 0.1);
		border-radius: 20px;
	}

	&::-webkit-scrollbar-thumb {
		background: rgba(18, 74, 128, 0.5);
		opacity: 0.5;
		border-radius: 20px;
	}
`;

const GridItem = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom: 1px solid #3c658c;
	padding: 0.3rem;
	width: 97%;
`;

const ItemDetails = styled.div`
	display: flex;
`;

const ItemText = styled.p`
	margin-right: 10px;
	font-size: 10px;
	/* color: var(--text-color); */
`;

const Action = styled.div`
	color: #eb6a2b;

	.icon {
		color: #eb6a2b;
		/* background-color: #eb6a2b; */
	}
`;

const StrongText = styled.span`
	color: var(--text-color);
	font-weight: bold;
	font-size: 13px;
`;

const SmallText = styled.span`
	font-size: 11px;
	color: var(--text-color);
`;

const ListOfBene = ({ rechargeType }) => {
	const [authUrl, setAuthUrl] = useState('');
	useEffect(() => {
		if (authUrl !== '') {
			window.location = authUrl;
			return;
		}
		return;
	}, [authUrl]);

	const [btnDisabled, setBtnDisabled] = useState(false);

	const {
		listOfBulk,
		setListOfBulk,
		paymentMode,
		setResponseMessage,
		startDate,
	} = useContext(GlobalContext);
	const { setResponseModal, setErrorMessage, setErrorModal } =
		useContext(ModalContext);

	const handleDelete = (index) => {
		setListOfBulk(listOfBulk.filter((e, b) => b !== index));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setBtnDisabled(true);
		if (btnDisabled) {
			return;
		}

		const scheduledDate = convertDate(startDate);

		let bulkData;

		const finalData = listOfBulk.map(({ recipient, ...each }) => ({
			recipient: recipient.replace(/\D+/g, ''),
			...each,
		}));

		if (rechargeType === 2) {
			if (paymentMode === 'wallet') {
				bulkData = {
					paymentMode,
					recipients: finalData,
					scheduledDate,
					rechargeType: 'bulk',
				};
			} else {
				bulkData = {
					paymentMode,
					scheduledDate,
					rechargeType: 'bulk',
					recipients: finalData,
					redirectUrl: `${window.origin}${window.location.pathname}`,
				};
			}

			try {
				const response = await makeScheduledRecharge(bulkData);
				if (response.data.authorizationUrl) {
					setAuthUrl(response.data.authorizationUrl);
					localStorage.setItem('id', JSON.stringify(response.data.id));
					localStorage.setItem('type', JSON.stringify(rechargeType));
					setBtnDisabled(false);
					return;
				} else {
					setBtnDisabled(false);
					setResponseModal(true);
					setResponseMessage('Schedule Success');
				}
			} catch (error) {
				setBtnDisabled(false);
				const message = error.response.data.message;
				setErrorModal(true);
				setErrorMessage(message);
			}
		} else {
			if (paymentMode === 'wallet') {
				bulkData = { paymentMode, recipients: finalData };
			} else {
				bulkData = {
					paymentMode,
					recipients: finalData,
					redirectUrl: `${window.origin}${window.location.pathname}`,
				};
			}

			try {
				const response = await makeBulkRecharge(bulkData);
				console.log(response);

				if (response.data.authorizationUrl) {
					setAuthUrl(response.data.authorizationUrl);
					localStorage.setItem('id', JSON.stringify(response.data.id));
					setBtnDisabled(false);
					return;
				} else {
					setBtnDisabled(false);
					setResponseModal(true);
					setResponseMessage(response.data.message);
				}
			} catch (error) {
				setBtnDisabled(false);
				const message = error.response.data.message;
				setErrorModal(true);
				setErrorMessage(message);
			}
		}
	};
	return (
		listOfBulk.length > 0 && (
			<Container onSubmit={handleSubmit}>
				<Inner>
					{listOfBulk.map((each, index) => {
						return (
							<GridItem key={index}>
								<ItemDetails>
									<ItemText>{each.recipient}</ItemText>
									<ItemText>{each.serviceCode}</ItemText>
								</ItemDetails>
								<Action>
									<GrFormClose
										onClick={() => handleDelete(index)}
										style={{ fill: 'red' }}
										className='icon'
										color='#eb6a2b'
									/>
								</Action>
							</GridItem>
						);
					})}
				</Inner>
				<Bottom>
					<TextContainer>
						<StrongText>{listOfBulk.length}</StrongText>
						<SmallText> item(s) added to bulk list</SmallText>
					</TextContainer>
					<SendButton>
						<Send className={btnDisabled && 'not-allowed'}>Send</Send>
					</SendButton>
				</Bottom>
			</Container>
		)
	);
};

export default ListOfBene;
