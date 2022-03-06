import styled from 'styled-components';

const Text = styled.p`
	font-size: 12px;
	color: var(--text-color);
`;

const InnerText = ({ children }) => {
	return <Text>{children}</Text>;
};

export default InnerText;
