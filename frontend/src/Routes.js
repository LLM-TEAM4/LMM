import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import SignupID from "./pages/Signup/SignupID";
import Main from "./pages/Main/Main";

class AppRoutes extends React.Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/signupid" element={<SignupID />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </Router>
    );
  }
}

export default AppRoutes;
