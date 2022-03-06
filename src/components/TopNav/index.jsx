import React from 'react';
import UserServices from '../../services/UserServices';
import {
	StrongText,
	TopContainer,
	TopInner,
	TopLeft,
	TopRight,
	UserName,
} from './styles';

const TopHeader = ({ header }) => {
	return (
		<TopContainer>
			<TopInner>
				<TopLeft>
					<StrongText>{header}</StrongText>
				</TopLeft>
				<TopRight>
					<UserName>{UserServices.getUsername()}</UserName>
				</TopRight>
			</TopInner>
		</TopContainer>
	);
};

export default TopHeader;
