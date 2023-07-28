import React, { useState, useEffect } from "react";
import { ProjectForm } from "../components/ProjectForm";
import { HwCheckoutForm } from "../components/HwCheckoutForm";
import HWButton from "../components/HWButton";
import { NewProject } from "../components/NewProject";
import { HwCheckinForm } from "../components/HwCheckinForm";
import { Navigate, useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const [goToLogin, setGoToLogin] = useState(false);

  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    fetch("/user_info")
      .then((response) => response.json())
      .then((data) => {
        const isLoggedIn = data.isLoggedIn;
        setCurrentUser(data.username);
        // console.log(data);
        if (isLoggedIn) {
          console.log(goToLogin);
        } else {
          setGoToLogin(true);
        }
      })
      .catch((error) => {
        setGoToLogin(true);
      });
  }, []);

  if (goToLogin) {
    return <Navigate to="/" />;
  }

  const handleLogout = async () => {
    try {
      const response = await fetch("/logout", {
        method: "POST",
      });

      if (response.ok) {
        console.log(response);
        navigate("/");
      } else {
      }
    } catch (error) {
      console.error("ERROR:", error);
    }
  };

  return (
    <div className="col">
      <h1>Welcome to your Dashboard!</h1>
      <p>User: {currentUser}</p>
      <button onClick={handleLogout}>Sign Out</button>
      <hr></hr>

      <HWButton></HWButton>
      <h2>Check Project resource!</h2>
      <ProjectForm></ProjectForm>
      <hr></hr>
      <h2>Create Project!</h2>
      <NewProject></NewProject>
      <hr></hr>
      <h2>Hardware Resource Check Out!</h2>
      <HwCheckoutForm></HwCheckoutForm>
      <hr></hr>
      <h2>Hardware Resource Check In!</h2>
      <HwCheckinForm></HwCheckinForm>
    </div>
  );
}

export default Dashboard;
