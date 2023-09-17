import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./components/Landingpage";
import { PrivateRoute, PublicRoute } from "./components/Routes";
import Beneficiaries from "./components/Secured/Beneficiary";
import Bulk from "./components/Secured/Bulk";
import Dashboard from "./components/Secured/Dashboard";
import Fund from "./components/Secured/Fund";
import Organization from "./components/Secured/Organization";
import Profile from "./components/Secured/Profile";
import Single from "./components/Secured/Single";
import Transactions from "./components/Secured/Transactions";
import Auto from "./components/Secured/Auto";
import History from "./components/Secured/History";
import Requests from "./components/Secured/Requests/index";

const App = () => {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route exact path="/*" element={<Landing />} />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/single" element={<Single />} />
        <Route exact path="/bulk" element={<Bulk />} />
        <Route exact path="/wallet" element={<Fund />} />
        <Route exact path="/auto" element={<Auto />} />
        <Route exact path="/bene" element={<Beneficiaries />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/history" element={<Requests />} />
        <Route exact path="/transactions" element={<Transactions />} />
        <Route exact path="/organization" element={<Organization />} />
      </Route>
    </Routes>
  );
};

export default App;
