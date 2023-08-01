import React, { useState, useEffect } from "react";
import { Form, Input, Button } from "semantic-ui-react";

export const ProjectForm = () => {
  // State for the projectID input field
  const [projectID, setProjectID] = useState("");

  // State to store the data from the server response
  const [data, setData] = useState([{}]);

  // State to handle the message displayed based on the server response
  const [message, setMessage] = useState();

  // useEffect to check the data state changes and update the message accordingly
  useEffect(() => {
    if (data.restatus === 1) {
      console.log("good");
      // Display project details if data.restatus is 1
      setMessage(
        <div>
          <p>Project ID : {data.pID}</p>
          <p>hw1_checked : {data.hw1_checked}</p>
          <p>hw2_checked : {data.hw2_checked}</p>
          <p>Owner : {data.owner}</p>
          <p>Member: </p>
          <ol>

            {data.member.map((member) => (

              <li>{member}</li>
            ))}
          </ol>

        </div>
      );
    } else if (data.restatus === 0) {
      console.log("wrong");
      // Display a message if data.restatus is 0
      setMessage(
        <div>
          <p>Can't find it!</p>
        </div>
      );
    }
  }, [data]);

  return (
    <div>
      <Form>
        <Form.Field>
          Project ID :
          <Input
            placeholder="project ID"
            value={projectID}
            onChange={(e) => setProjectID(e.target.value)}
          />
          {/* <Input placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} /> */}
        </Form.Field>
        <Form.Field>
          <Button
            onClick={async () => {
              const project = { projectID };

              // Send a POST request to the server with project data and update the data state with the server response
              fetch("/queryproject", {
                method: "POST",
                headers: {
                  "Content-Type": "application.json",
                },
                body: JSON.stringify(project),
              })
                .then((response) => response.json())
                .then((data) => {
                  setData(data);
                  console.log(data);
                });

              console.log(data["restatus"]);
              console.log(data.restatus);
            }}
          >
            Project Check
          </Button>
        </Form.Field>
      </Form>

      {/* Display the message based on the server response */}
      {message}
    </div>
  );
};
