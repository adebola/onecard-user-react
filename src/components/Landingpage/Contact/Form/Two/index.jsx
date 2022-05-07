import React from "react";
import form from "../../../../../assets/contactwe.jpg";

import { MdOutlineLocationOn, MdOutlineEmail } from "react-icons/md";
import { AiOutlineTwitter, AiOutlineInstagram } from "react-icons/ai";
import { BiPhoneCall } from "react-icons/bi";
import { FaFacebookF, FaLinkedin } from "react-icons/fa";
import styled from "styled-components";

const BoxTwo = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: auto;
  flex-direction: column;
`;

const ImageContainer = styled.div`
  width: 86%;
  border-radius: 20px;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
`;

const TextBox = styled.div`
  display: flex;
  /* align-items: center; */
  margin-top: 30px;
  /* justify-content: center; */
  /* background-color: red; */
  width: 86%;
`;

const Icon = styled.div`
  color: var(--btn-color);
  margin-right: 10px;
`;

const SmallText = styled.p`
  font-size: 14px;
  color: var(--btn-color);
`;

const Link = styled.a`
  color: inherit;
  text-decoration: none;
`;

const Two = () => {
  return (
    <>
      <BoxTwo>
        <ImageContainer>
          <Image src={form} alt="form" />
        </ImageContainer>
        <TextBox>
          <Icon>
            <MdOutlineLocationOn />
          </Icon>
          <SmallText>
            No 6 Obukun Street, Ilupeju Estate, off Coker Road, Lagos, Nigeria.
          </SmallText>
        </TextBox>
        <TextBox>
          <Icon>
            <BiPhoneCall />
          </Icon>
          <SmallText>+234 817-0037-787, +234 814-9657-228 </SmallText>
        </TextBox>
        <TextBox>
          <Icon>
            <MdOutlineEmail />
          </Icon>
          <SmallText>
            <Link href="mailto:info@onecardnigeria.com">
              info@onecardnigeria.com
            </Link>
          </SmallText>
        </TextBox>
        <TextBox>
          <>
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
              <Link
                target="_blank"
                href="https://www.twitter.com/onecardnigeria"
              >
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
          </>
        </TextBox>
      </BoxTwo>
    </>
  );
};

export default Two;
