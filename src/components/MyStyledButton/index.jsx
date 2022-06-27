import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button as ButtonContainer, ButtonRipple } from "./styles";

const ANIMATION_MS = 600;
const CIRCLE_SIZE = 50;

const Button = ({ color, btnDisabled, to, name, myStyles, disabled }) => {
  const navigate = useNavigate();

  const [ripples, setRipples] = useState([]);
  const [clicked, _] = useState(false);

  function shift(array) {
    const newArray = [...array];
    newArray.shift();
    return newArray;
  }
  const handleClick = (e) => {
    const box = e.target.getBoundingClientRect();
    if (clicked) return;
    const singleRipple = {
      x: e.clientX - box.left - CIRCLE_SIZE / 2,
      y: e.clientY - box.top - CIRCLE_SIZE / 2,
    };
    const newRipples = [...ripples, singleRipple];
    setRipples(newRipples);
    setTimeout(() => {
      const emptyArray = shift(ripples);
      setRipples(emptyArray);
      if (to) {
        navigate(to);
      }
      _(false);
    }, ANIMATION_MS - 270);
  };

  return (
    <Container myStyles={myStyles}>
      <ButtonContainer
        color={color}
        disabled={disabled}
        className={clicked && "not-allowed"}
        onClick={handleClick}
      >
        {name}{" "}
        {ripples.map((ripple, i) => (
          <ButtonRipple key={i} x={ripple.x} y={ripple.y} />
        ))}
      </ButtonContainer>
    </Container>
  );
};

export default Button;
