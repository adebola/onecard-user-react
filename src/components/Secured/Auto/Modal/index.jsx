import React, { useContext } from "react";
import SingleContextProvider, {
  SingleContext,
} from "../../../../context/SingleRecharge";
import RechargeDetails from "./RechargeDetails";

const AutoModal = () => {
  return (
    <SingleContextProvider>
      <RechargeDetails />
    </SingleContextProvider>
  );
};

export default AutoModal;
