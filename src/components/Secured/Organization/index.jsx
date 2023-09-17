import React, { useContext, useEffect, useState } from "react";
import Container from "../../Container";
import SmallText from "../../SmallText";
import TopHeader from "../../TopNav";
import Wrapper from "../../Wrapper";
import HamburgerMenu from "../../Hamburger";
import MenuList from "../../Hamburger/Menulist";
import styled from "styled-components";
import {
  addUserRoleRequest,
  getOrganizationDetails,
  getUserAssignedRoles,
  getUserDetails,
  getUserRoles,
  removeUserRoleRequest,
} from "../../../helper/requests";
import { ModalContext } from "../../../context/ModalProvider";

const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
`;
const Inner = styled.div`
  min-height: 350px;
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

const OrganizationName = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const OrganizationLabel = styled.div`
  background: var(--light-background);
  padding: 10px;
  min-width: 150px;
  margin-left: 9px;
  border-radius: 6px;

  color: var(--text-color);
  font-weight: bold;
`;

const OrganizationUsers = styled.div`
  height: 300px;
  overflow-y: scroll;
`;

const SingleUser = styled.div`
  margin: 10px;
  background: var(--light-background);
  width: 92%;
  padding: 15px 10px;
  cursor: pointer;
  border-radius: 6px;
  color: var(--text-color);

  &.active {
    background: var(--text-color);
    color: var(--white);
  }

  &:hover {
    background: var(--text-color);
    color: var(--white);
  }
`;

const UserText = styled.p``;

const OrganizationText = styled(UserText)`
  color: var(--text-color);
`;

const Organization = () => {
  const [organizationUsers, setOrganizationUsers] = useState([]);
  const [organizationName, setOrganizationName] = useState("");
  const [firstRoleId, setFirstRoleId] = useState("");
  const [secondRoleId, setSecondRoleId] = useState("");

  const {
    setUserId,
    userId,
    setQuestionModal,
    setOrganizationId,
    reload,
    setReload,
  } = useContext(ModalContext);

  const [userRole, setUserRole] = useState([]);
  const [assignedRole, setAssignedRole] = useState([]);

  useEffect(() => {
    const awaitResponse = async () => {
      try {
        const firstResponse = await getUserDetails();
        const response = await getOrganizationDetails(
          firstResponse.data.organizationId
        );
        setOrganizationId(firstResponse.data.organizationId);
        setOrganizationUsers(response.data.users);
        setOrganizationName(response.data.organizationName);
      } catch (error) {
        const message = error.response.data.message;
        console.log(message);
      }
    };

    awaitResponse();
  }, [reload, setOrganizationId]);

  useEffect(() => {
    if (!userId) return;
    const awaitResponse = async () => {
      try {
        const firstRes = await getUserRoles(userId);
        const secRes = await getUserAssignedRoles(userId);
        setUserRole(firstRes.data);
        setAssignedRole(secRes.data);
        setReload(false);
        setFirstRoleId("");
        setSecondRoleId("");
      } catch (error) {
        const message = error.response.data.message;
        console.log(message);
      }
    };
    awaitResponse();
  }, [reload, setReload, userId]);

  const [toggle, setToggle] = useState(false);

  const handleClick = async (id) => {
    setUserId(id);
    try {
      const firstRes = await getUserRoles(id);
      const secRes = await getUserAssignedRoles(id);
      setUserRole(firstRes.data);
      setAssignedRole(secRes.data);
    } catch (error) {
      const message = error.response.data.message;
      console.log(message);
    }
  };

  const handleRemove = () => {
    setQuestionModal(true);
  };

  const removeUserRole = async () => {
    const data = { roleList: [firstRoleId] };
    try {
      await removeUserRoleRequest(userId, data);
      setReload(true);
    } catch (error) {
      const message = error.response.data.message;
      console.log(message);
    }
  };

  const addUserRole = async () => {
    const data = { roleList: [secondRoleId] };
    try {
      await addUserRoleRequest(userId, data);
      setReload(true);
    } catch (error) {
      const message = error.response.data.message;
      console.log(message);
    }
  };

  const renderUsers = (arr) => {
    return (
      <OrganizationUsers>
        {organizationUsers.map((user) => {
          return (
            <SingleUser
              className={user.id === userId && "active"}
              onClick={() => {
                setUserId(user.id);
                handleClick(user.id);
              }}
              key={user.id}
            >
              <UserText>
                {user.firstName} {user.lastName}
              </UserText>
            </SingleUser>
          );
        })}
      </OrganizationUsers>
    );
  };

  return (
    <>
      <HamburgerMenu toggle={toggle} setToggle={setToggle} />
      <MenuList toggle={toggle} setToggle={setToggle} />
      <Wrapper>
        <TopHeader header="Organization" />

        {organizationName && (
          <OrganizationName>
            <OrganizationText>Organization Name</OrganizationText>
            <OrganizationLabel>{organizationName}</OrganizationLabel>
          </OrganizationName>
        )}

        <Container>
          <Users>
            <Inner>
              <SmallText text="Users" />

              {renderUsers()}
            </Inner>
            <ButtonContainer>
              {userRole.length > 0 && (
                <Button onClick={handleRemove}>Remove</Button>
              )}
            </ButtonContainer>
          </Users>

          <AvailableRoles>
            <Inner>
              <SmallText text="Assigned Roles" />

              <OrganizationUsers>
                {userRole.map((user) => {
                  return (
                    <SingleUser
                      className={user.id === firstRoleId && "active"}
                      key={user.id}
                      onClick={() => setFirstRoleId(user.id)}
                    >
                      <UserText>{user.name}</UserText>
                    </SingleUser>
                  );
                })}
              </OrganizationUsers>
            </Inner>
            {firstRoleId && (
              <ButtonContainer>
                <Button onClick={removeUserRole}>Remove</Button>
              </ButtonContainer>
            )}
          </AvailableRoles>

          <AssignedRoles>
            <Inner>
              <SmallText text="Available Roles" />

              <OrganizationUsers>
                {assignedRole.map((user) => {
                  return (
                    <SingleUser
                      onClick={() => setSecondRoleId(user.id)}
                      className={user.id === secondRoleId && "active"}
                      key={user.id}
                    >
                      <UserText>{user.name}</UserText>
                    </SingleUser>
                  );
                })}
              </OrganizationUsers>
            </Inner>
            {secondRoleId && (
              <ButtonContainer>
                <Button onClick={addUserRole}>add</Button>
              </ButtonContainer>
            )}
          </AssignedRoles>
        </Container>
      </Wrapper>
    </>
  );
};

export default Organization;
