import React, { useState, useEffect } from "react";
import { Users } from "./components/Users";
import { UserForm } from "./components/UserForm";
import { Container } from "semantic-ui-react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
} from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import { NewUserForm } from "./components/NewUserForm";

function App1() {
  const [data, setData] = useState([{}]);

  return (
    <div>
      <Routes>
        {/* <Route path="/home" element = {<Home />} /> */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>

      <Container>
        <UserForm></UserForm>
        <hr></hr>
        <NewUserForm></NewUserForm>
        {/* <Users users={data}></Users> */}
      </Container>
    </div>
  );
}

export default App1;
