import React from "react";
import {
  Container,
  Inner,
  Logo,
  Title,
  LogoContainer,
  SecondBox,
  InputContainer,
  Input,
  Button,
  Left,
  Straight,
  Outer,
  CopyRight,
  Icons,
  Icon,
  FlexInner,
} from "./styles";
import logo from "../../../assets/footer.png";

import { AiOutlineInstagram, AiOutlineTwitter } from "react-icons/ai";

import styled from "styled-components";

import { FaFacebookF, FaLinkedin } from "react-icons/fa";

const Link = styled.a`
  color: #fff;
`;

const Footer = () => {
  const date = new Date();
  return (
    <Outer>
      <Container>
        <FlexInner>
          <LogoContainer>
            <Logo src={logo} alt="logo" />
          </LogoContainer>
          <SecondBox>
            <Left>
              <Title>Signup For Our Newsletter</Title>
              <InputContainer>
                <Input placeholder="Enter your email" />
                <Button>Subscribe</Button>
              </InputContainer>
            </Left>
          </SecondBox>
        </FlexInner>
      </Container>
      <Straight />
      <Inner>
        <CopyRight>
          Copyright © {date.getFullYear()}. All rights reserved.
        </CopyRight>
        <Icons>
          <Icon>
            <Link
              target="_blank"
              href="https://www.instagram.com/onecardnigeria"
            >
              <AiOutlineInstagram size={15} />
            </Link>
          </Icon>
          <Icon>
            <Link
              target="_blank"
              href="https://www.facebook.com/OneCardNigeria"
            >
              <FaFacebookF size={15} />
            </Link>
          </Icon>
          <Icon>
            <Link target="_blank" href="https://www.twitter.com/onecardnigeria">
              <AiOutlineTwitter size={15} />
            </Link>
          </Icon>
          <Icon>
            <Link
              target="_blank"
              href="https://www.linkedin.com/company/onecard-nigeria"
            >
              <FaLinkedin size={15} />
            </Link>
          </Icon>
        </Icons>
      </Inner>
    </Outer>
  );
};

export default Footer;
