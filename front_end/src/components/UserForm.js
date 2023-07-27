import React, { useState, useEffect } from "react";
import { Form, Input, Button, Message } from "semantic-ui-react";
import { Navigate } from "react-router-dom";
import { NewUserForm } from "./NewUserForm";
// import { useAlert } from "react-alert";

export const UserForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [data, setData] = useState([{}]);

  const [goToDashboard, setGoToDashboaed] = useState(false);

  const [message, setMessage] = useState("");

  // const alert = useAlert();

  useEffect(() => {
    if (data.restatus === 1) {
      console.log("good");
      console.log(goToDashboard);
      setGoToDashboaed(true);
    } else if (data.restatus === 0) {
      setMessage("wrong Username or Password. Try Agian!");
      alert("wrong Username or Password. Try Agian!");
    }
  }, [data]);

  const [isTextVisible, setIsTextVisible] = useState(false);

  const handleButtonClick = () => {
    setIsTextVisible(true); // Toggle the value of isTextVisible
  };

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
          ></Input>
          <Input
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Input>
        </Form.Field>
        <Form.Field>
          <Button
            onClick={async () => {
              const user = { username, password };

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
            Sing In
          </Button>

          <Button onClick={handleButtonClick}>Sing Up</Button>
        </Form.Field>
      </Form>

      {/* {message} */}
      {isTextVisible && <NewUserForm />}
    </div>
  );
};
