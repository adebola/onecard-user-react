import React, { useState, useEffect, useContext } from "react";
import Container from "../../Container";
import SmallText from "../../SmallText";
import TopHeader from "../../TopNav";
import Wrapper from "../../Wrapper";
import Recharge from "./Recharge";

import HamburgerMenu from "../../Hamburger";
import MenuList from "../../Hamburger/Menulist";
import { SingleBoxOne, SingleBoxTwo } from "./styles";
import { AuthContext } from "../../../context/AuthProvider";
import {
  getScheduledRechargeResponse,
  getSingleRechargeResponse,
} from "../../../helper/requests";
import { GlobalContext } from "../../../context/GlobalProvider";
import { ModalContext } from "../../../context/ModalProvider";
import Card from "../../Card";

const Single = () => {
  const [toggle, setToggle] = useState(false);
  const { authId } = useContext(AuthContext);

  const { setResponseMessage } = useContext(GlobalContext);
  const { setResponseModal, setCableMessage } = useContext(ModalContext);

  useEffect(() => {
    if (authId === null) {
      return;
    }

    if (localStorage.getItem("type")) {
      const awaitResponse = async () => {
        if (localStorage.getItem("id")) {
          try {
            const parsedId = JSON.parse(localStorage.getItem("id"));
            await getScheduledRechargeResponse(parsedId);
            setResponseModal(true);
            setResponseMessage("Data Success");
          } catch (error) {
            setResponseModal(true);
            setResponseMessage("Something went wrong, please try again");
          }
        }
      };
      awaitResponse();
      return;
    }

    const awaitResponse = async () => {
      if (localStorage.getItem("name")) {
        if (localStorage.getItem("id")) {
          try {
            const parsedId = JSON.parse(localStorage.getItem("id"));
            const response = await getSingleRechargeResponse(parsedId);
            setResponseModal(true);
            setCableMessage(response.data.message);
          } catch (error) {
            setResponseModal(true);
            setResponseMessage("Something went wrong, please try again");
          }
        }
        return;
      }

      if (localStorage.getItem("cable")) {
        if (localStorage.getItem("id")) {
          try {
            const parsedId = JSON.parse(localStorage.getItem("id"));
            const response = await getSingleRechargeResponse(parsedId);
            setResponseModal(true);
            setCableMessage(response.data.message);
          } catch (error) {
            setResponseModal(true);
            setResponseMessage("Something went wrong, please try again");
          }
        }
        return;
      }

      if (localStorage.getItem("id")) {
        try {
          const parsedId = JSON.parse(localStorage.getItem("id"));
          const response = await getSingleRechargeResponse(parsedId);
          setResponseModal(true);
          setResponseMessage(response.data.message);
        } catch (error) {
          setResponseModal(true);
          setResponseMessage("Something went wrong, please try again");
        }
      }
    };
    awaitResponse();
  }, [authId, setResponseMessage, setCableMessage, setResponseModal]);

  return (
    <>
      <HamburgerMenu toggle={toggle} setToggle={setToggle} />
      <MenuList toggle={toggle} setToggle={setToggle} />
      <Wrapper>
        <TopHeader header="Single Recharge" />
        <Container>
          <SingleBoxOne>
            <SmallText text="Recharge" />
            <Recharge />
          </SingleBoxOne>
          <SingleBoxTwo>
            <SmallText text="Recharge Details" />
            {/* <RechargeDetails /> */}
            <Card />
          </SingleBoxTwo>
        </Container>
      </Wrapper>
    </>
  );
};

export default Single;
