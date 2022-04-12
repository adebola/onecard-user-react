import { Container, HamburgerDiv, Inner, Logo, LogoContainer } from "./styles";
import oneCard from "../../assets/onecard-white.svg";

import { Squash as Hamburger } from "hamburger-react";
import { Link } from "react-router-dom";

const HamburgerMenu = ({ toggle, setToggle }) => {
  return (
    <Container>
      <Inner>
        <LogoContainer>
          <Link onClick={() => setToggle(false)} to="/dashboard">
            <Logo src={oneCard} alt="logo" />
          </Link>
        </LogoContainer>
        <HamburgerDiv>
          <Hamburger
            size={23}
            hideOutline={true}
            toggled={toggle}
            toggle={setToggle}
          />
        </HamburgerDiv>
      </Inner>
    </Container>
  );
};

export default HamburgerMenu;
