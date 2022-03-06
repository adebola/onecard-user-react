import React, { useEffect, useContext } from 'react';
import { AuthContext } from '../../../../context/AuthProvider';
import { GlobalContext } from '../../../../context/GlobalProvider';
import { ModalContext } from '../../../../context/ModalProvider';
import { getSingleRechargeResponse } from '../../../../helper/noauthrequests';
import NoAuthContainer from '../../Container';
import One from './One';
import Two from './RechargeDetails';

const Landing = () => {
	const { authId } = useContext(AuthContext);

	const { setResponseMessage } = useContext(GlobalContext);
	const { setResponseModal } = useContext(ModalContext);

	useEffect(() => {
		if (authId === null) {
			return;
		}
		const awaitResponse = async () => {
			if (localStorage.getItem('id')) {
				try {
					const parsedId = JSON.parse(localStorage.getItem('id'));
					const response = await getSingleRechargeResponse(parsedId);
					console.log(response);
					setResponseModal(true);
					setResponseMessage(response.data.message);
				} catch (error) {
					setResponseModal(true);
					setResponseMessage('Something went wrong, please try again');
				}
			}
		};
		awaitResponse();
	}, [authId, setResponseMessage, setResponseModal]);

	return (
		<NoAuthContainer top='true'>
			<>
				<One />
			</>
			<>
				<Two />
			</>
		</NoAuthContainer>
	);
};

export default Landing;
