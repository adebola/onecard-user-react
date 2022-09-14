import styled from "styled-components";
import { Tab } from "@headlessui/react";

const Container = styled.div`
  min-height: 464px;
  padding: 2rem 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 90px 4px;
  border-radius: 20px;
  transition: all 0.5s ease;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: ${({ repeat }) => `repeat(${repeat}, 1fr)`};
  gap: 20px;
  margin: 20px 0;
`;

const GridItem = styled.div`
  height: 50px;
  background: rgba(235, 106, 43, 0.1);
  border-radius: 10px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  color: var(--text-color);
  cursor: pointer;
  flex-direction: column;

  &.active {
    background: #114a80;
    color: #fff;
  }
`;
const GridText = styled.p`
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 8px;
  letter-spacing: 0em;
  text-align: center;
  margin-top: 10px;

  &.active {
    background: var(--text-color);
    color: var(--white);
  }
`;

const Image = styled.img`
  width: 34px;
  ${({ filter }) => {
    return filter && "filter: brightness(0) invert(1)";
  }};
`;

const SmallText = styled.p`
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 11px;
  letter-spacing: 0em;
  text-align: left;
  color: var(--text-color);
`;

const StyledTab = styled(Tab)`
  padding: 0.5rem 0;
  margin-right: 0.5rem;
  background: none;
  outline: none;
  border: none;
  cursor: pointer;
  font-size: 11px;
  margin-top: 10px;
  &.active {
    color: var(--text-color);
    font-weight: bold;
    border-bottom: 1px solid var(--text-color);
  }
`;

const Line = styled.div`
  height: 1px;
  background: #e4e7eb;
  width: 100%;
`;

export {
  Container,
  Grid,
  GridItem,
  GridText,
  Image,
  SmallText,
  StyledTab,
  Line,
};
