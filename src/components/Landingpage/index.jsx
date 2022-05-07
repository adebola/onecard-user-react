import React from "react";
import { Route, Routes } from "react-router-dom";
import Blog from "./Blog";
import Contact from "./Contact";
import HomePage from "./Homepage";
import RechargeCard from "./RechargeCard";
import Services from "./Services";
import styled from "styled-components";
import ScrollToTop from "../ScrollToTop";

const Body = styled.div`
  position: relative;
`;

const Landing = () => {
  return (
    <Body>
      <Routes>
        <Route exact element={<HomePage />} path="/" />
        <Route element={<Blog />} path="/blog" />
        <Route element={<Contact />} path="/contact" />
        <Route element={<RechargeCard />} path="/recharge" />
        <Route element={<Services />} path="/services" />
      </Routes>
      <ScrollToTop />
    </Body>
  );
};

export default Landing;
