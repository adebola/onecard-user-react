import styled from "styled-components/macro";
import { HomepageResponsive } from "../../../responsive/responsive";

export const Outer = styled.div`
  background-color: var(--btn-color);
  padding-bottom: 3rem;
  position: relative;
  height: 350px;
`;

export const Container = styled.div`
  padding: 3rem 2rem;
  display: flex;
  /* height: 290px; */
  align-items: end;
`;

export const FlexInner = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
  align-items: center;

  ${HomepageResponsive({ flexDirection: "column", alignItems: "start" })}
`;

export const Inner = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
  align-items: center;
  ${HomepageResponsive({
    flexDirection: "column",
    alignItems: "start",
  })}
`;

export const LogoContainer = styled.div`
  flex: 1;
`;

export const Logo = styled.img`
  width: 70px;
  ${HomepageResponsive({ width: "50px" })}
`;

export const SecondBox = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: end;
`;

export const Title = styled.p`
  font-size: 19px;
  font-style: normal;
  font-weight: 700;
  line-height: 25px;
  margin: 10px 0;
  color: #ffffff;
`;

export const Left = styled.div`
  /* width: 60%; */
`;

export const Straight = styled.div`
  height: 2px;

  background: var(--white);

  margin: 0 2rem;
  margin-bottom: 1rem;
`;

export const InputContainer = styled.div``;

export const Input = styled.input`
  padding: 0.7rem;
  padding-left: 0.5rem;
  outline: none;
  border: none;
  color: var(--white);
  background: rgba(0, 0, 0, 0.28);

  ::placeholder {
    color: var(--white);
    opacity: 0.7;
  }
`;

export const Button = styled.button`
  padding: 0.7rem;
  background: var(--text-color);
  outline: none;
  border: none;
  color: var(--white);
  cursor: pointer;
`;

export const CopyRight = styled.div`
  margin-left: 2rem;
  flex: 1;
  color: white;
  font-size: 13px;
`;
export const Icon = styled.div`
  cursor: pointer;
  margin-right: 10px;
`;

export const Icons = styled.div`
  margin-right: 2rem;
  color: white;
  display: flex;
  flex: 1;
  justify-content: end;

  ${HomepageResponsive({ marginLeft: "2rem", marginTop: "1rem" })}
`;
