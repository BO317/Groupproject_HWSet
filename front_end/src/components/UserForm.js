import React, { useState, useEffect } from "react";
import { Form, Input, Button, Message } from "semantic-ui-react";
import { Navigate } from "react-router-dom";
import { NewUserForm } from "./NewUserForm";

export const UserForm = () => {
  // State for the username and password input fields
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // State to store the data from the server response
  const [data, setData] = useState([{}]);

  // State to indicate if the user should be redirected to the dashboard
  const [goToDashboard, setGoToDashboard] = useState(false);

  // State to handle the error message if login fails
  const [message, setMessage] = useState("");

  // State to manage the visibility of additional text (not used in the code)
  const [isTextVisible, setIsTextVisible] = useState(false);

  // useEffect to check the data state changes and act accordingly
  useEffect(() => {
    if (data.restatus === 1) {
      console.log("good");
      console.log(goToDashboard);
      setGoToDashboard(true); // Set goToDashboard to true if data.restatus is 1
    } else if (data.restatus === 0) {
      setMessage("wrong Username or Password. Try Again!"); // Set the error message if data.restatus is 0
      alert("wrong Username or Password. Try Again!"); // Show an alert if data.restatus is 0
    }
  }, [data]);

  // Function to handle the "Sign Up" button click
  const handleButtonClick = () => {
    setIsTextVisible(true); // Toggle the value of isTextVisible (not used in the code)
  };

  // If goToDashboard is true, redirect the user to the Dashboard
  if (goToDashboard) {
    return <Navigate to="/Dashboard" />;
  }

  return (
    <div>
      <Form>
        <Form.Field>
          <Input
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <Button
            onClick={async () => {
              const user = { username, password };

              // Send a POST request to the server with user data and update the data state with the server response
              fetch("/queryuser", {
                method: "POST",
                headers: {
                  "Content-Type": "application.json",
                },
                body: JSON.stringify(user),
              })
                .then((response) => response.json())
                .then((data) => {
                  setData(data);
                  console.log(data);
                });
            }}
          >
            Sign In
          </Button>

          <Button onClick={handleButtonClick}>Sign Up</Button>
        </Form.Field>
      </Form>

      {isTextVisible && <NewUserForm />}
    </div>
  );
};
