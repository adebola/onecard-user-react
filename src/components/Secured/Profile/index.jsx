import React, { useState, useEffect, useContext } from "react";
import Container from "../../Container";
import SmallText from "../../SmallText";
import TopHeader from "../../TopNav";
import Wrapper from "../../Wrapper";

import HamburgerMenu from "../../Hamburger";
import MenuList from "../../Hamburger/Menulist";
import styled from "styled-components";
import UserServices from "../../../services/UserServices";
import { IoMdClipboard } from "react-icons/io";
import { MdModeEditOutline } from "react-icons/md";
import { UseFocus } from "../../../utils/useFocus";
import {
  getUserDetails,
  getUserGeneratedSecret,
  updateUserDetails,
} from "../../../helper/requests";
import { formatBalance } from "../../../utils/formatBalance";
import { ModalContext } from "../../../context/ModalProvider";

import { CopyToClipboard } from "react-copy-to-clipboard";
import toast, { Toaster } from "react-hot-toast";

const ProfileContainer = styled.div`
  flex: 1;
`;

//profileDetails

const DetailsContainer = styled.div`
  margin-top: 24px;
`;

const InputAndButton = styled.div`
  display: flex;
  border: 1px solid var(--text-color);
  height: 40px;
  padding-left: 10px;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 20px;

  &.active {
    border: 2px solid var(--text-color);
  }
`;

const Text = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  font-size: 16px;
`;

const EditButton = styled.button`
  width: 100px;
  outline: none;
  border: none;
  border-left: 1px solid var(--text-color);
  cursor: pointer;
`;

const Label = styled.div`
  margin-bottom: 5px;
  color: var(--text-color);
  font-size: 13px;
`;

//profile picture
const ImageContainer = styled.div`
  padding-top: 20px;
  display: flex;
  align-items: center;
`;

const Image = styled.div`
  width: 100px;
  background-color: rgb(228, 228, 228);
  height: 100px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const ProfileImage = styled(Image)`
  position: relative;
`;

const ProfilePicture = styled.img`
  width: 100%;
  height: 100%;
`;

const ProfileButton = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
`;

const Click = styled.button`
  position: relative;
  background: none;
  outline: none;
  border: none;
  margin-left: 10px;
  color: var(--btn-color);
  font-weight: 500;
  font-size: 12px;
`;

const Admin = styled.div``;

const AdminBox = styled.div``;

const One = styled.div``;

const Two = styled.div`
  display: flex;
  flex-direction: column;
`;

const TextContainer = styled.div`
  padding: 9px;
  height: 40px;
  border-radius: 6px;
  position: relative;
  font-size: 14px;
  background: #eee;
  width: 100%;
`;

const Secret = styled.div`
  display: flex;
`;

const SecretContainer = styled(TextContainer)`
  margin-right: 5px;
  position: relative;
`;

const GenerateButton = styled.button`
  width: 100px;
  cursor: pointer;
  outline: none;
  border: none;
  background: var(--text-color);
  color: var(--white);
  border-radius: 6px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChangePassword = styled(GenerateButton)`
  width: 200px;
  padding: 17px 10px;
  margin-top: 20px;
  @media (max-width: 768px) {
    width: 150px;
  }
`;
const EditDetails = styled(GenerateButton)`
  width: 200px;
  padding: 17px 10px;
  margin-top: 20px;
  background: var(--btn-color);
  @media (max-width: 768px) {
    width: 150px;
  }
`;

const CopyIcon = styled.div`
  position: absolute;
  top: 5px;
  right: 10px;
  cursor: pointer;
`;

const Profile = () => {
  const data = [
    {
      id: 1,
      title: "First Name",
      name: "firstName",
      edit: false,
    },
    {
      id: 2,
      title: "Last Name",
      name: "lastName",
      edit: false,
    },
    { id: 3, title: "Email", name: "email", noButton: true },
    {
      id: 4,
      title: "Username",
      name: "username",
      noButton: true,
    },
    {
      id: 5,
      title: "Account Balance",
      name: "accountBalance",
      noButton: true,
    },
  ];
  const { setPasswordModal } = useContext(ModalContext);

  const [fields, setFields] = useState(data);
  const [showOutline, setShowOutline] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editButton, setEditButton] = useState(false);
  const [focus, setFocus] = UseFocus();
  const [secret, setSecret] = useState("");
  const [token, setToken] = useState("");

  const [details, setDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    accountBalance: 0,
  });

  const [img, setImg] = useState(null);
  const [toggle, setToggle] = useState(false);
  const [file, setFile] = useState(null);

  const showSecretAndToken =
    process.env.NODE_ENV === "development"
      ? UserServices.checkCompanyRole("offline")
      : UserServices.checkCompanyRole("Company");

  useEffect(() => {
    if (!edit) return;
    if (edit) {
      setEdit(false);
      setFocus();
    }
  }, [edit, setFocus]);

  //
  useEffect(() => {
    const awaitResponse = async () => {
      const { firstName, lastName, email, accountBalance, username } = details;
      try {
        if (!firstName || !lastName || !email || !accountBalance || !username) {
          const res = await getUserDetails();
          setDetails({
            accountBalance: formatBalance(res.data.account.balance),
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            email: res.data.email,
            username: res.data.username,
          });

          setToken(res.data.id);
        }

        return;
      } catch (error) {
        console.error(error);
      }
    };
    awaitResponse();
  }, [details]);

  //TO-DO

  const generateSecret = async () => {
    try {
      const response = await getUserGeneratedSecret();
      setSecret(response.data.secret);
    } catch (error) {
      console.log(error);
    }
  };

  const renderProfileButton = () => {
    return <ProfileButton type="file" onChange={handleChange} />;
  };

  const renderSingleInput = (e) => {
    const onChange = (e) => {
      setDetails({ ...details, [e.target.name]: e.target.value });
    };

    const handleEdit = (id) => {
      setEditButton(true);
      const newDetails = fields.map((e) => {
        if (e.id === id) {
          e.edit = true;
          setFocus();
          setEdit(true);
          setShowOutline(true);
        } else {
          e.edit = false;
        }
        return e;
      });
      setFields(newDetails);
    };

    return (
      <div key={e.id}>
        <Label>{e.title}</Label>
        <InputAndButton className={e.edit && showOutline && "active"}>
          {e.edit ? (
            <Input
              ref={focus}
              name={e.name}
              onBlur={() => setShowOutline(false)}
              onChange={onChange}
              placeholder={e.name}
              value={details[e.name]}
            />
          ) : (
            <Text>{details[e.name]}</Text>
          )}
          {!e.noButton && (
            <EditButton onClick={() => handleEdit(e.id)}>
              <MdModeEditOutline size={24} color="#114a80" />
            </EditButton>
          )}
        </InputAndButton>
      </div>
    );
  };

  //
  const renderProfileDetails = () => {
    return (
      <ProfileContainer>
        <SmallText text="Profile Details" />
        <DetailsContainer>
          {fields.map((e) => renderSingleInput(e))}
        </DetailsContainer>
        <ButtonContainer>
          <ChangePassword
            onClick={() => {
              setPasswordModal(true);
            }}
          >
            Change Password
          </ChangePassword>
          {editButton && (
            <EditDetails
              onClick={async () => {
                const { firstName, lastName } = details;
                const data = { firstName, lastName };
                try {
                  await updateUserDetails(data);
                  toast.success("Profile Updated successfully");
                  setEditButton(false);
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              Save Changes
            </EditDetails>
          )}
        </ButtonContainer>
      </ProfileContainer>
    );
  };

  //admin-profile
  const renderAdminProfile = () => {
    return (
      <Admin>
        <AdminBox>
          <One>
            <SmallText text="Token" />

            <TextContainer>
              {token && (
                <>
                  <Text>{token}</Text>
                  <CopyToClipboard text={token}>
                    <CopyIcon
                      onClick={() => toast.success("Copied Successfully")}
                    >
                      <IoMdClipboard size={20} color="#114a80" />
                    </CopyIcon>
                  </CopyToClipboard>
                </>
              )}
            </TextContainer>
          </One>

          <Two>
            <SmallText text="Secret" />
            <Secret>
              <SecretContainer>
                <Text>{secret}</Text>
                {secret && (
                  <CopyToClipboard text={secret}>
                    <CopyIcon
                      onClick={() => toast.success("Copied Successfully")}
                    >
                      <IoMdClipboard size={20} color="#114a80" />
                    </CopyIcon>
                  </CopyToClipboard>
                )}
              </SecretContainer>
              <GenerateButton onClick={generateSecret}>Generate</GenerateButton>
            </Secret>
          </Two>
        </AdminBox>
      </Admin>
    );
  };

  const profilePicture = () => {
    return (
      <ProfileContainer>
        <SmallText text="Profile Picture" />
        <ImageContainer>
          <Image>
            {img === null ? (
              <ProfileImage>{renderProfileButton()}</ProfileImage>
            ) : (
              <Image>
                <ProfilePicture src={img} />
              </Image>
            )}
          </Image>
          <Click>
            Click to upload profile picture
            {renderProfileButton()}
          </Click>
        </ImageContainer>

        {showSecretAndToken && renderAdminProfile()}
      </ProfileContainer>
    );
  };

  const handlePictureRender = (e) => {
    setImg(URL.createObjectURL(e));
  };

  const handleChange = (e) => {
    if (!e.target.files[0]) {
      console.log(`No`);
    } else {
      console.log(`Yes`);
      setFile(e.target.files[0]);
      handlePictureRender(e.target.files[0]);
    }
  };

  return (
    <>
      <HamburgerMenu toggle={toggle} setToggle={setToggle} />
      <MenuList toggle={toggle} setToggle={setToggle} />
      <Wrapper>
        <TopHeader header="Profile" />
        <Container>
          <Toaster position="top-right" reverseOrder={false} />
          {renderProfileDetails()}
          {profilePicture()}
        </Container>
      </Wrapper>
    </>
  );
};

export default Profile;
