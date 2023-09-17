import { css } from 'styled-components';

export const MobileResponsive = (props) => {
	return css`
		@media (max-width: 768px) {
			${props}
		}
	`;
};
