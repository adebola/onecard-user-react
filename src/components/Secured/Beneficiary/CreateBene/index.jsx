import { useState, useContext } from 'react';
import Button from '../../../Button/normal';
import styled from 'styled-components';
import { createBeneficiary } from '../../../../helper/requests';
import { ModalContext } from '../../../../context/ModalProvider';
import InputMask from 'react-input-mask';

const Container = styled.form`
	/* background: red; */
	width: 386px;
	padding: 1rem;
	height: 361px;
	background: rgba(255, 255, 255, 0.1);
	box-shadow: 0px 4px 90px 4px rgba(0, 0, 0, 0.1);
	border-radius: 20px;

	@media (max-width: 386px) {
		width: 100%;
	}
`;

const Inner = styled.div`
	height: 250px;
`;

const Input = styled.input`
	width: 100%;
	outline: none;
	margin: 5px 0;
	padding: 0.6rem;
	border: 1.2px solid var(--text-color);
	border-radius: 10px;
	color: var(--text-color);
	&::placeholder {
		color: var(--text-color);
	}

	&:focus {
		border: 1.5px solid var(--text-color);
	}
`;

const MaskInput = styled(InputMask)`
	width: 100%;
	outline: none;
	margin: 5px 0;
	padding: 0.6rem;
	border: 1.2px solid var(--text-color);
	border-radius: 10px;
	color: var(--text-color);
	&::placeholder {
		color: var(--text-color);
	}

	&:focus {
		border: 1.5px solid var(--text-color);
	}
`;

const InputContainer = styled.div``;

export const SaveButtonContainer = styled.div`
	width: 100%;
`;

const CreateBeneficiary = ({ setReload }) => {
	//Beneficiaries details
	const { setErrorMessage, setErrorModal } = useContext(ModalContext);
	const [active, setActive] = useState(false);
	const [phoneNo, setPhoneNo] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		setActive(true);
		if (active) {
			return;
		}
		const data = { telephone: phoneNo, firstName, lastName, email };

		try {
			await createBeneficiary(data);
			setReload(true);
			setActive(false);
		} catch (error) {
			setErrorModal(true);
			const message = error.response.data.message;
			setErrorMessage(message);
			setActive(false);
		}
		resetAllValue();
	};

	const resetAllValue = () => {
		setEmail('');
		setPhoneNo('');
		setFirstName('');
		setLastName('');
	};

	const disabled = phoneNo === '' || email === '';

	return (
		<>
			<Container onSubmit={handleSubmit}>
				<Inner>
					<InputContainer>
						<MaskInput
							value={phoneNo}
							onChange={({ target }) => setPhoneNo(target.value)}
							type='tel'
							mask='999 9999 9999'
							maskChar=' '
							placeholder='Enter Phone number'
						/>
					</InputContainer>
					<InputContainer>
						<Input
							value={firstName}
							onChange={({ target }) => setFirstName(target.value)}
							type='text'
							placeholder='Enter First Name'
						/>
					</InputContainer>
					<InputContainer>
						<Input
							value={lastName}
							onChange={({ target }) => setLastName(target.value)}
							type='text'
							placeholder='Enter Last Name'
						/>
					</InputContainer>
					<InputContainer>
						<Input
							value={email}
							onChange={({ target }) => setEmail(target.value)}
							type='email'
							placeholder='Enter Email address'
						/>
					</InputContainer>
				</Inner>
				<SaveButtonContainer>
					<Button
						className={active && 'not-allowed'}
						disabled={disabled}
						name='Save'
					/>
				</SaveButtonContainer>
			</Container>
		</>
	);
};

export default CreateBeneficiary;
