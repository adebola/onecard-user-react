import React from "react";
import NoAuthContainer from "../../Container";
import One from "./One";
import Two from "./Two";

const WhyOneCard = () => {
  return (
    <div
      style={{
        marginTop: "100px",
      }}
    >
      <NoAuthContainer>
        <>
          <One />
        </>
        <>
          <Two />
        </>
      </NoAuthContainer>
    </div>
  );
};

export default WhyOneCard;
