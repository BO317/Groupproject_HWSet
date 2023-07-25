import React, { useState } from "react";
import { Form, Input, Button, Message } from "semantic-ui-react";
import { Navigate } from "react-router-dom";
import { Alert } from "react-native";
// import { useAlert } from "react-alert";

export const UserForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [data, setData] = useState([{}]);

  const [goToDashboard, setGoToDashboaed] = useState(false);

  // const alert = useAlert();

  if (goToDashboard) {
    return <Navigate to="/Dashboard" />;
  }

  return (
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

            console.log(data["dbstatus"]);
            if (data.dbstatus === 1) {
              console.log("good");
              setGoToDashboaed(true);
            } else {
              console.log("wrong Username or Password. Try Agian!");
            }
          }}
        >
          Login
        </Button>
      </Form.Field>
    </Form>
  );
};
