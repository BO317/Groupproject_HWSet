import React, { useState } from "react";
import { Form, Input, Button, Message } from "semantic-ui-react";
import { Navigate } from "react-router-dom";

export const NewUserForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [frist, setFrist] = useState("");
  const [last, setLast] = useState("");
  const [data, setData] = useState([{}]);

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
        <Input
          placeholder="fristname"
          value={frist}
          onChange={(e) => setFrist(e.target.value)}
        ></Input>
        <Input
          placeholder="lastname"
          value={last}
          onChange={(e) => setLast(e.target.value)}
        ></Input>
      </Form.Field>
      <Form.Field>
        <Button
          onClick={async () => {
            const user = { name: { frist, last }, username, password };

            fetch("/newuser", {
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

            console.log(data.dbstatus);

            if (data.restatus === 1) {
              console.log("new user created");
            } else {
              console.log("username exist");
            }
          }}
        >
          New User Sign up
        </Button>
      </Form.Field>
    </Form>
  );
};
