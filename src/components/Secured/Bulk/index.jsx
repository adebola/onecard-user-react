import React, { useState, useContext, useEffect } from "react";
import Container from "../../Container";
import Wrapper from "../../Wrapper";
import TopHeader from "../../TopNav";
import { BulkBoxOne, BulkBoxTwo } from "./styles";

import Recharge from "./Recharge";
// import RechargeDetails from "./RechargeDetails";
import SmallText from "../../SmallText";
import HamburgerMenu from "../../Hamburger";
import MenuList from "../../Hamburger/Menulist";
import { AuthContext } from "../../../context/AuthProvider";
import { GlobalContext } from "../../../context/GlobalProvider";
import { ModalContext } from "../../../context/ModalProvider";
import {
  getBulkRechargeResponse,
  getScheduledRechargeResponse,
} from "../../../helper/requests";
import Card from "../../Card";

const Bulk = () => {
  const [toggle, setToggle] = useState(false);
  // const [rechargeType, setRechargeType] = useState(1);

  const { authId } = useContext(AuthContext);

  const { setResponseMessage } = useContext(GlobalContext);
  const {
    setResponseModal,
    setErrorModal,
    setErrorMessage,
    rechargeType,
    setRechargeType,
  } = useContext(ModalContext);

  useEffect(() => {
    if (authId === null) {
      return;
    }

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
            const message = error.response.data.message;
            setErrorModal(true);
            setErrorMessage(message);
          }
        }
      };
      awaitResponse();
      return;
    }
    const awaitResponse = async () => {
      if (localStorage.getItem("id")) {
        try {
          const parsedId = JSON.parse(localStorage.getItem("id"));
          const response = await getBulkRechargeResponse(parsedId);
          setResponseModal(true);
          setResponseMessage(response.data.message);
        } catch (error) {
          const message = error.response.data.message;
          setErrorModal(true);
          setErrorMessage(message);
        }
      }
    };
    awaitResponse();
  }, [
    authId,
    setResponseMessage,
    setResponseModal,
    setErrorMessage,
    setErrorModal,
  ]);

  return (
    <>
      <HamburgerMenu toggle={toggle} setToggle={setToggle} />
      <MenuList toggle={toggle} setToggle={setToggle} />

      <Wrapper>
        <TopHeader header="Bulk Recharge" />
        <Container>
          <BulkBoxOne>
            <SmallText text="Recharge" />
            <Recharge
              rechargeType={rechargeType}
              setRechargeType={setRechargeType}
            />
          </BulkBoxOne>
          <BulkBoxTwo>
            <SmallText text="Recharge Details" />
            {/* <RechargeDetails rechargeId={rechargeType} /> */}
            <Card bulk />
          </BulkBoxTwo>
        </Container>
      </Wrapper>
    </>
  );
};

export default Bulk;
