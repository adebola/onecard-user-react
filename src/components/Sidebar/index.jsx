import oneCard from "../../assets/onecard-white.svg";
import UserServices from "../../services/UserServices";
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
} from "./styles";

const Sidebar = () => {
  const sidebardata = [
    {
      id: 1,
      name: "Dashboard",
      link: "/dashboard",
    },
    {
      id: 2,
      name: "Single Recharge",
      link: "/single",
    },
    {
      id: 3,
      name: "Bulk Recharge",
      link: "/bulk",
    },
    {
      id: 4,
      name: "Fund Wallet",
      link: "/fund",
    },
    {
      id: 5,
      name: "Beneficiaries",
      link: "/bene",
    },
    {
      id: 6,
      name: "Auto Recharge",
      link: "/auto",
    },
    {
      id: 7,
      name: "Transactions",
      link: "/transactions",
    },
    {
      id: 8,
      name: "History",
      link: "/history",
    },
  ];

  const bottom = [
    {
      id: 9,
      name: "Profile",
      link: "/profile",
    },
    {
      id: 10,
      name: "Organization",
      link: "/organization",
    },
  ];

  const isAdmin =
    process.env.NODE_ENV === "development"
      ? UserServices.checkAdminRole("offline_access")
      : UserServices.checkAdminRole("Company_Admin");

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
                  <SidebarLink to={each.link} activeclassname="active">
                    {each.name}
                  </SidebarLink>
                </SidebarLinkItem>
              );
            })}
          </SidebarInner>

          <SmallText>Account</SmallText>
          <SidebarInner>
            {bottom.map((each) => {
              if (each.id === 10) {
                return (
                  isAdmin && (
                    <SidebarLinkItem key={each.id}>
                      <SidebarLink activeclassname="active" to={each.link}>
                        {each.name}
                      </SidebarLink>
                    </SidebarLinkItem>
                  )
                );
              }
              return (
                <SidebarLinkItem key={each.id}>
                  <SidebarLink activeclassname="active" to={each.link}>
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
