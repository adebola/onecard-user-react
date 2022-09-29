import React from "react";
import NoAuthContainer from "../../Container";
import One from "./One";
import Two from "./RechargeDetails";

const Landing = () => {
  return (
    <NoAuthContainer top="true">
      <>
        <One />
      </>
      <>
        <Two />
      </>
    </NoAuthContainer>
  );
};

export default Landing;
