import React from 'react';
import {
	Container,
	Inner,
	LinkItem,
	LinkMenu,
	SideLink,
	SmallText,
	Top,
} from './styles';
import UserServices from '../../../services/UserServices';

const MenuList = ({ toggle, setToggle }) => {
	const sidebardata = [
		{
			id: 1,
			name: 'Dashboard',
			link: '/dashboard',
		},
		{
			id: 2,
			name: 'Single Recharge',
			link: '/single',
		},
		{
			id: 3,
			name: 'Bulk Recharge',
			link: '/bulk',
		},
		{
			id: 4,
			name: 'Fund Wallet',
			link: '/fund',
		},
		{
			id: 5,
			name: 'Beneficiaries',
			link: '/bene',
		},
		// {
		// 	id: 6,
		// 	name: 'Auto & Scheduled',
		// 	link: '/auto',
		// },
		{
			id: 7,
			name: 'Transactions',
			link: '/transactions',
		},
		// {
		// 	id: 8,
		// 	name: 'Roles',
		// 	link: '/roles',
		// },
	];

	return (
		<Container className={toggle ? 'show' : ''}>
			<Inner>
				<Top>
					<SmallText>Menu</SmallText>
					<LinkMenu>
						{sidebardata.map((each) => {
							return (
								<LinkItem key={each.id}>
									<SideLink
										onClick={() => setToggle(false)}
										activeclassname='active'
										to={each.link}>
										{each.name}
									</SideLink>
								</LinkItem>
							);
						})}
					</LinkMenu>
				</Top>
				<Top>
					<SmallText>Account</SmallText>
					<LinkMenu>
						{/* <LinkItem>
							<SideLink to={PROFILE}>Profile</SideLink>
						</LinkItem> */}
						{/* <LinkItem>One</LinkItem> */}
						<LinkItem logout='true' onClick={UserServices.doLogout}>
							Logout
						</LinkItem>
					</LinkMenu>
				</Top>
			</Inner>
		</Container>
	);
};

export default MenuList;
