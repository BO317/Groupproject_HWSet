import React, { useState, useEffect } from "react";
import { Form, Input, Button } from "semantic-ui-react";

export const NewUserForm = () => {
  // State for the username, password, first name, and last name input fields
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [frist, setFrist] = useState("");
  const [last, setLast] = useState("");

  // State to store the data from the server response
  const [data, setData] = useState([{}]);

  // State to handle the message displayed based on the server response
  const [message, setMessage] = useState("");

  // useEffect to check the data state changes and update the message accordingly
  useEffect(() => {
    if (data.restatus === 1) {
      alert("new user created");
      setMessage("new user created"); // Set the success message if data.restatus is 1
      console.log("new user created");
    } else if (data.restatus === 0) {
      alert(data.message);
      setMessage(data.message); // Set the message if data.restatus is 0
      console.log(data.message);
    } else {
      // Additional handling for other cases 
    }
  }, [data]);

  return (
    <div>
      {/* {message} Display the message based on the server response */}
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
          <Input
            placeholder="fristname"
            value={frist}
            onChange={(e) => setFrist(e.target.value)}
          />
          <Input
            placeholder="lastname"
            value={last}
            onChange={(e) => setLast(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <Button
            onClick={async () => {
              const user = { name: { frist, last }, username, password };

              // Send a POST request to the server with user data and update the data state with the server response
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

                });

              console.log(data.dbstatus);
            }}
          >
            New User Sign up
          </Button>
        </Form.Field>
      </Form>
    </div>
  );
};
