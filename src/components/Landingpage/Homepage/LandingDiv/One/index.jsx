import React from 'react';
import styled from 'styled-components';
import { LandingPage } from '../../../../../responsive/responsive';

const Container = styled.div`
	flex: 1;
`;

const Inner = styled.div``;

const BoxOne = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	padding-left: 50px;
	${LandingPage({ paddingLeft: '0', marginTop: '50px' })}
`;

const Top = styled.div`
	margin-bottom: 20px;
	${LandingPage({ marginBottom: '0px' })}
`;

const Middle = styled.div`
	margin-bottom: 20px;
`;

const BoxOneInner = styled.div``;

const SmallText = styled.p`
	font-size: 64px;
	font-style: normal;
	font-weight: 400;
	line-height: 65px;
	letter-spacing: 0em;
	text-align: left;
	color: var(--text-color);

	${LandingPage({ fontSize: '38px', lineHeight: '30px' })}
`;

const StrongText = styled.p`
	font-size: 64px;
	font-style: normal;
	font-weight: 700;
	line-height: 65px;
	color: var(--text-color);
	letter-spacing: 0em;
	text-align: left;
	${LandingPage({ fontSize: '38px' })}
`;

const MiddleText = styled.p`
	font-size: 19px;
	font-style: normal;
	font-weight: 400;
	line-height: 32px;
	letter-spacing: 0em;
	text-align: left;
	color: var(--btn-color);
`;

const One = () => {
	return (
		<Container>
			<Inner>
				<BoxOne>
					<BoxOneInner>
						<Top>
							<SmallText>Life just got easier</SmallText>
							<StrongText> with OneCard </StrongText>
						</Top>
						<Middle>
							<MiddleText>
								Schedule (or automatically repeat) airtime recharges, data
								recharges, tv subscriptions or electricity payments
							</MiddleText>
						</Middle>
					</BoxOneInner>
				</BoxOne>
			</Inner>
		</Container>
	);
};

export default One;
