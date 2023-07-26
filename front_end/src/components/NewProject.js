import React, { useState, useEffect } from "react";
import { Form, Input, Button } from "semantic-ui-react";

export const NewProject = () => {
  const [projectID, setProjectID] = useState("");
  // const [password, setPassword] = useState("");

  const [data, setData] = useState([{}]);

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (data.restatus === 1) {
      console.log("good");
      setMessage(
        <div>
          <p>Good!</p>
        </div>
      );
    } else {
      console.log("wrong");
      setMessage(
        <div>
          <p>Project ID exist</p>
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
          ></Input>
          {/* <Input placeholder = 'password' value ={password} onChange ={e => setPassword(e.target.value)}></Input> */}
        </Form.Field>
        <Form.Field>
          <Button
            onClick={async () => {
              const project = { projectID };

              fetch("/newproject", {
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
            New Project
          </Button>
        </Form.Field>
      </Form>

      {message}
    </div>
  );
};
