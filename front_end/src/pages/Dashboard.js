import React, { useState, useEffect } from "react";
import { ProjectForm } from "../components/ProjectForm";
import { HwCheckoutForm } from "../components/HwCheckoutForm";
import HWButton from "../components/HWButton";
import { NewProject } from "../components/NewProject";
import { HwCheckinForm } from "../components/HwCheckinForm";
import { Navigate, useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  // State to track if the user should be redirected to login
  const [goToLogin, setGoToLogin] = useState(false);

  // State to store the current user's username
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    // Fetch user info to check if the user is logged in
    fetch("/user_info")
      .then((response) => response.json())
      .then((data) => {
        const isLoggedIn = data.isLoggedIn;
        setCurrentUser(data.username);
        // console.log(data);
        if (isLoggedIn) {
          console.log(goToLogin);
        } else {
          setGoToLogin(true); // If the user is not logged in, set goToLogin to true to redirect to login page
        }
      })
      .catch((error) => {
        setGoToLogin(true); // If there is an error in fetching user info, set goToLogin to true to redirect to login page
      });
  }, []);

  if (goToLogin) {
    return <Navigate to="/" />; // Redirect to the login page if goToLogin is true
  }

  // Function to handle user logout
  const handleLogout = async () => {
    try {
      const response = await fetch("/logout", {
        method: "POST",
      });

      if (response.ok) {
        console.log(response);
        navigate("/"); // Navigate to the login page after successful logout
      } else {
        // Handle logout failure if needed
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
