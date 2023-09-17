import {
  Action,
  Container,
  DetailsContainer,
  Icon,
  ImageAndText,
  ImageTextContainer,
  LightText,
  SendButton,
  StrongText,
  Text,
  TextContainer,
} from "./styles";

import { MdDeleteOutline } from "react-icons/md";
import { useContext } from "react";
import { ModalContext } from "../../../../../context/ModalProvider";
import { deleteBeneficiary } from "../../../../../helper/requests";
import { GlobalContext } from "../../../../../context/GlobalProvider";
const SingleBeneficiary = ({ each, setReload }) => {
  const { setSendToBeneModal, setName, setErrorMessage, setErrorModal } =
    useContext(ModalContext);
  const { setPhoneNumber } = useContext(GlobalContext);

  const handleDelete = async (id) => {
    try {
      await deleteBeneficiary(id);
      setReload(true);
    } catch (e) {
      setErrorMessage(e.response.data.message);
      setErrorModal(true);
    }
  };

  return (
    <Container>
      {each?.text ? (
        <TextContainer>
          <Text>{each?.text}</Text>
        </TextContainer>
      ) : (
        <TextContainer>
          <Text></Text>
        </TextContainer>
      )}
      <DetailsContainer>
        <ImageAndText>
          <ImageTextContainer>
            <StrongText>
              {each.firstName} {each.lastName}
            </StrongText>
            <LightText>{each.telephone}</LightText>
          </ImageTextContainer>
        </ImageAndText>
        <Action>
          <SendButton
            onClick={() => {
              setName(each.firstName);
              setSendToBeneModal(true);
              setPhoneNumber(each.telephone);
            }}
          >
            Send
          </SendButton>
          <Icon>
            <MdDeleteOutline
              size={22}
              color="#FF0000"
              onClick={() => handleDelete(each.id)}
            />
          </Icon>
        </Action>
      </DetailsContainer>
    </Container>
  );
};

export default SingleBeneficiary;
