import React from "react";
import {
  Container,
  Inner,
  LinkItem,
  LinkMenu,
  SideLink,
  SmallText,
  Top,
} from "./styles";
import UserServices from "../../../services/UserServices";

const MenuList = ({ toggle, setToggle }) => {
  const isAdmin =
    process.env.NODE_ENV === "development"
      ? UserServices.checkAdminRole("offline_access")
      : UserServices.checkAdminRole("Company_Admin");

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
      name: "Wallet",
      link: "/wallet",
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

  return (
    <Container className={toggle ? "show" : ""}>
      <Inner>
        <Top>
          <SmallText>Menu</SmallText>
          <LinkMenu>
            {sidebardata.map((each) => {
              return (
                <LinkItem key={each.id}>
                  <SideLink
                    onClick={() => setToggle(false)}
                    activeclassname="active"
                    to={each.link}
                  >
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
            <LinkItem>
              <SideLink to="/profile">Profile</SideLink>
            </LinkItem>

            {isAdmin && (
              <LinkItem>
                <SideLink to="/organization">Organization</SideLink>
              </LinkItem>
            )}

            <LinkItem logout="true" onClick={UserServices.doLogout}>
              Logout
            </LinkItem>
          </LinkMenu>
        </Top>
      </Inner>
    </Container>
  );
};

export default MenuList;
