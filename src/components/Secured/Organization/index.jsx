import React, { useEffect, useState } from "react";
import Container from "../../Container";
import SmallText from "../../SmallText";
import TopHeader from "../../TopNav";
import Wrapper from "../../Wrapper";
import HamburgerMenu from "../../Hamburger";
import MenuList from "../../Hamburger/Menulist";
import styled from "styled-components";
import {
  getOrganizationDetails,
  getUserDetails,
} from "../../../helper/requests";
import UserServices from "../../../services/UserServices";

const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
`;
const Inner = styled.div`
  min-height: 250px;
`;

const Button = styled.button`
  position: relative;
  display: inline-block;
  height: 50px;
  width: 150px;
  line-height: 49px;
  padding: 0 16px;
  font-size: 12px;
  font-family: Roboto;
  color: white;
  background: var(--btn-color);
  border: 1px solid silver;
  border-radius: 4px;
  text-transform: uppercase;
  outline: 0;
  cursor: pointer;
  overflow: hidden;
  letter-spacing: 1px;
  margin-left: auto;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.06, 0.67, 0.37, 0.99);

  &:hover {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);
  }
`;

const Users = styled.div`
  flex: 1;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0px 4px 90px 4px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  padding: 10px;
`;

const AvailableRoles = styled.div`
  flex: 1;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0px 4px 90px 4px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  padding: 10px;
`;

const AssignedRoles = styled.div`
  flex: 1;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0px 4px 90px 4px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  padding: 10px;
`;

const Organization = () => {
  useEffect(() => {
    const awaitResponse = async () => {
      const firstResponse = await getUserDetails();
      const response = await getOrganizationDetails(
        firstResponse.data.account.userId
      );
      console.log(response.data);
    };

    awaitResponse();
  }, []);

  console.log(UserServices._kc);

  const [toggle, setToggle] = useState(false);

  return (
    <>
      <HamburgerMenu toggle={toggle} setToggle={setToggle} />
      <MenuList toggle={toggle} setToggle={setToggle} />
      <Wrapper>
        <TopHeader header="Organization" />
        <Container>
          <Users>
            <Inner>
              <SmallText text="Users" />
            </Inner>
            <ButtonContainer>
              <Button>Remove</Button>
            </ButtonContainer>
          </Users>
          <AvailableRoles>
            <Inner>
              <SmallText text="Available Roles" />
            </Inner>
            <ButtonContainer>
              <Button>add</Button>
            </ButtonContainer>
          </AvailableRoles>
          <AssignedRoles>
            <Inner>
              <SmallText text="Assigned Roles" />
            </Inner>

            <ButtonContainer>
              <Button>Remove</Button>
            </ButtonContainer>
          </AssignedRoles>
        </Container>
      </Wrapper>
    </>
  );
};

export default Organization;
