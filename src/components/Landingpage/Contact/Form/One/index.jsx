import React, { useContext, useState } from "react";
import styled from "styled-components";
import { GlobalContext } from "../../../../../context/GlobalProvider";
import { ModalContext } from "../../../../../context/ModalProvider";
import { makeContactRequest } from "../../../../../helper/noauthrequests";

const BoxOne = styled.div`
  flex: 1;
  width: 100%;
`;

const FormContainer = styled.form`
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 1rem;
  border-radius: 6px;
  outline: none;
  border: none;
  border: 1px solid var(--text-color);
  margin-bottom: 10px;
  &::placeholder {
    color: var(--text-color);
  }
`;

const Textarea = styled.textarea`
  border: 1px solid var(--text-color);
  height: 100px;
  margin-bottom: 20px;
  padding: 1rem;
  border-radius: 6px;

  &::placeholder {
    color: var(--text-color);
  }
`;

const Button = styled.button`
  padding: 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  outline: none;
  border: none;
  background-color: var(--btn-color);
  color: var(--white);

  &:hover {
    opacity: 0.9;
  }
`;

const One = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  const { setResponseMessage } = useContext(GlobalContext);
  const { setResponseModal, setErrorMessage, setErrorModal } =
    useContext(ModalContext);

  const resetAllValue = () => {
    setName("");
    setPhoneNumber("");
    setMessage("");
    setEmail("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name, email, phone: phoneNumber, message };
    try {
      await makeContactRequest(data);
      setResponseModal(true);
      setResponseMessage("Message sent successfully , we'd be in touch");
      resetAllValue();
    } catch (error) {
      setErrorMessage(error.response.data.message);
      setErrorModal(true);
      resetAllValue();
    }
  };

  return (
    <>
      <BoxOne>
        <FormContainer onSubmit={handleSubmit}>
          <Input
            placeholder="Name"
            value={name}
            onChange={({ target }) => setName(target.value)}
            required
          />
          <Input
            placeholder="Email"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            required
          />
          <Input
            placeholder="Phone"
            value={phoneNumber}
            onChange={({ target }) => setPhoneNumber(target.value)}
            required
          />
          <Textarea
            required
            placeholder="Message"
            value={message}
            onChange={({ target }) => setMessage(target.value)}
          />
          <Button>Send</Button>
        </FormContainer>
      </BoxOne>
    </>
  );
};

export default One;
