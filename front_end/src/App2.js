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

function App2() {
  const [data, setData] = useState([{}]);

  useEffect(() => {
    fetch("/user")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data);
      });
  }, []);

  return <div>{data.username}</div>;
}

export default App2;
