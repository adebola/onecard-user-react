import oneCard from '../../assets/onecard-white.svg';
import UserServices from '../../services/UserServices';
import {
	Container,
	Inner,
	Logo,
	LogoContainer,
	SidebarContainer,
	SidebarInner,
	SidebarLink,
	SidebarLinkItem,
	SmallText,
} from './styles';

const Sidebar = () => {
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

	const bottom = [
		// {
		// 	id: 9,
		// 	name: 'Profile',
		// 	link: '/profile',
		// },
	];

	return (
		<Container>
			<Inner>
				<LogoContainer>
					<Logo src={oneCard} />
				</LogoContainer>
				<SidebarContainer>
					<SmallText>Menu</SmallText>

					<SidebarInner>
						{sidebardata.map((each) => {
							return (
								<SidebarLinkItem key={each.id}>
									<SidebarLink to={each.link} activeclassname='active'>
										{each.name}
									</SidebarLink>
								</SidebarLinkItem>
							);
						})}
					</SidebarInner>

					<SmallText>Account</SmallText>
					<SidebarInner>
						{bottom.map((each) => {
							return (
								<SidebarLinkItem key={each.id}>
									<SidebarLink activeclassname='active' to={each.link}>
										{each.name}
									</SidebarLink>
								</SidebarLinkItem>
							);
						})}
						<SidebarLinkItem onClick={UserServices.doLogout}>
							Log out
						</SidebarLinkItem>
					</SidebarInner>
				</SidebarContainer>
			</Inner>
		</Container>
	);
};

export default Sidebar;
