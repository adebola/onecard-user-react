import styled, { keyframes } from "styled-components";

const ANIMATION_MS = 800;
const CIRCLE_SIZE = 50;

const ripple = keyframes`
  0% {
    opacity: 0.3;
    transform: scale(1);
  }

  50% {
    transform: scale(40);
  }

  100% {
    opacity: 0;
  }
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;

  ${({ myStyles }) => {
    return { ...myStyles };
  }}
`;

export const Button = styled.button`
  position: relative;
  display: inline-block;
  height: 50px;
  width: 100%;
  line-height: 49px;
  padding: 0 16px;
  font-size: 12px;
  font-family: Roboto;
  color: white;
  background: var(--btn-color);
  border: 1px solid silver;
  border-radius: 4px;
  text-transform: uppercase;
  outline: 0;
  cursor: pointer;
  overflow: hidden;
  letter-spacing: 1px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.8s cubic-bezier(0.06, 0.67, 0.37, 0.99);

  &:hover {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);
  }
  &:active {
    transform: translateY(2px);
  }
  &.not-allowed {
    cursor: not-allowed;
    transform: translateY(0px);
    box-shadow: none;
    opacity: 0.6;
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
    box-shadow: none;
  }
`;

export const ButtonRipple = styled.div`
  position: absolute;
  top: ${(props) => props.y}px;
  left: ${(props) => props.x}px;
  height: ${CIRCLE_SIZE}px;
  width: ${CIRCLE_SIZE}px;
  background: white;
  border-radius: 50%;
  opacity: 0.3;
  animation-name: ${ripple};
  animation-duration: ${ANIMATION_MS * 2}ms;
  animation-iteration-count: 1;
  animation-timing-function: ease;
  pointer-events: none;
`;
