import { GrFormCheckmark } from "react-icons/gr";
import React from "react";
import SmallText from "../../../SmallText";
import styled from "styled-components";

const Container = styled.div`
  margin-top: 40px;
`;

const Box = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--text-color);
  margin-right: 8px;
`;

const Text = styled.p`
  font-size: 13px;
`;

const Verified = () => {
  return (
    <Container>
      <SmallText text="KYC" />
      <div className="flex ai-center">
        <Box>
          <GrFormCheckmark size={25} />
        </Box>
        <Text>Verified</Text>
      </div>
    </Container>
  );
};

export default Verified;
