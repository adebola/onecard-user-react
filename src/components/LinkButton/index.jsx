import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
	background: red;
`;

const BtnLink = styled(Link)`
	cursor: pointer;
	outline: none;
	border: none;
	background: var(--btn-color);
	padding: 0.9rem 1rem;
	border-radius: 7px;
	color: var(--white);
	font-size: 14px;
	text-decoration: none;

	&:hover {
		background-color: #dd5c1c;
	}
`;

const LinkButton = ({ to, name }) => {
	return (
		<Container>
			<BtnLink to={to}>{name}</BtnLink>
		</Container>
	);
};

export default LinkButton;
