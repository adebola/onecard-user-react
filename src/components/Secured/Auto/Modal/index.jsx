import React from "react";
import SingleContextProvider from "../../../../context/SingleRecharge";
import RechargeDetails from "./RechargeDetails";

const AutoModal = ({ setModal }) => {
  return (
    <SingleContextProvider>
      <RechargeDetails setModal={setModal} />
    </SingleContextProvider>
  );
};

export default AutoModal;
