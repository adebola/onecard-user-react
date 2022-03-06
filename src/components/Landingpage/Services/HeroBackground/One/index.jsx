import React from 'react';
import styled from 'styled-components';
import { LandingPage } from '../../../../../responsive/responsive';

const Container = styled.div`
	flex: 1;
	padding: 2rem;
	/* background: red; */

	${LandingPage({ paddingLeft: '0', marginTop: '50px' })}
`;

const BoxOne = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	width: 100%;

	${LandingPage({ paddingLeft: '0', marginTop: '50px' })}
`;

const BoxOneInner = styled.div`
	/* background: red; */
`;

const Top = styled.div`
	margin-bottom: 20px;
	${LandingPage({ marginBottom: '30px' })}
`;

const Middle = styled.div`
	margin-bottom: 20px;
`;

const Bottom = styled.div`
	${LandingPage({ marginBottom: '10px' })}
`;

const SmallText = styled.div`
	font-size: 34px;
	font-style: normal;
	font-weight: 400;
	letter-spacing: 0em;
	text-align: left;
	color: var(--text-color);

	${LandingPage({ fontSize: '38px', marginTop: '5px' })}
`;

const StrongText = styled.p`
	font-size: 40px;
	font-style: normal;
	font-weight: 700;
	color: var(--text-color);
	letter-spacing: 0em;
	text-align: left;
	${LandingPage({ fontSize: '38px' })}
`;

const One = () => {
	return (
		<Container>
			{' '}
			<BoxOne>
				<BoxOneInner>
					<Top>
						<SmallText>
							Enjoy customized{' '}
							<StrongText>recharge and payment options with OneCard</StrongText>{' '}
						</SmallText>
					</Top>
					{/* <Bottom>
										<ContactButton>Explore</ContactButton>
									</Bottom> */}
				</BoxOneInner>
			</BoxOne>
		</Container>
	);
};

export default One;
