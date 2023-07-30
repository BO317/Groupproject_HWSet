import React, { useState, useEffect } from "react";
import { Users } from "./components/Users";
import { UserForm } from "./components/UserForm";
import { Container } from "semantic-ui-react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
  Redirect,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { NewUserForm } from "./components/NewUserForm";

function App1() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/main" component={Dashboard} /> */}
        {/* <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <PrivateRoute
          path="/main"
          element={<Dashboard setIsLoggedIn={setIsLoggedIn} />}
          isLoggedIn={isLoggedIn}
        /> */}
      </Routes>
    </div>
  );
}

export default App1;
