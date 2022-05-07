import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaChevronUp } from "react-icons/fa";

const Circle = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: center;
  bottom: 39px;
  left: 29px;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1002;
  transform: translateY(200%);
  transition: all 0.4s cubic-bezier(0.7, 0, 0.84, 0);
  &.show {
    transform: translateY(0%);
  }

  &:hover {
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.5);
    transition: all 0.2s ease;
  }
`;

const ScrollToTop = () => {
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const scrollHandler = () => {
      if (window.scrollY > 100) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      <Circle className={scroll && "show"} onClick={scrollToTop}>
        <FaChevronUp size={22} color="#eb6a2b" />
      </Circle>
    </>
  );
};

export default ScrollToTop;
