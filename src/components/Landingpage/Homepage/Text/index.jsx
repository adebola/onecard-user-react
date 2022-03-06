import React from 'react';
import { BigText, SignUpButton, TextAndButton } from './styles';

import UserServices from '../../../services/UserServices';

const TextContainer = () => {
	return (
		<>
			<TextAndButton>
				<BigText>
					Sign up and enjoy swift recharge service to any network
				</BigText>
				<SignUpButton onClick={UserServices.doRegister}>
					Sign up for free
				</SignUpButton>
			</TextAndButton>
		</>
	);
};

export default TextContainer;
