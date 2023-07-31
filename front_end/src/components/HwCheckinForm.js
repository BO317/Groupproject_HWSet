import React, { useState } from "react";
import { Form, Input, Button } from "semantic-ui-react";

export const HwCheckinForm = () => {
  // State for the projectID, hw1Checkin, and hw2Checkin input fields
  const [projectIDCheckIn, setProjectIDCheckin] = useState("");
  const [hw1Checkin, sethw1Checkin] = useState(0);
  const [hw2Checkin, sethw2Checkin] = useState(0);

  // State to store the data from the server response
  const [data, setData] = useState([{}]);

  return (
    <div>
      <Form>
        <Form.Field>
          Project ID :
          <Input
            placeholder="project ID"
            value={projectIDCheckIn}
            onChange={(e) => setProjectIDCheckin(e.target.value)}
          />
          HW1
          <Input
            placeholder="hw1Checkin"
            value={hw1Checkin}
            onChange={(e) => sethw1Checkin(e.target.value)}
          />
          HW2
          <Input
            placeholder="hw2Checkin"
            value={hw2Checkin}
            onChange={(e) => sethw2Checkin(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <Button
            onClick={async () => {
              const hardwareCheckin = {
                projectIDCheckIn,
                hw1Checkin,
                hw2Checkin,
              };

              // Send a POST request to the server with hardwareCheckin data and update the data state with the server response
              fetch("/hwcheckin", {
                method: "POST",
                headers: {
                  "Content-Type": "application.json",
                },
                body: JSON.stringify(hardwareCheckin),
              })
                .then((response) => response.json())
                .then((data) => {
                  setData(data);
                  console.log(data);
                  if (data.restatus === 1) {
                    alert("Successfully Checked in"); // Show an alert if data.restatus is 1
                  } else if (data.restatus === 0) {
                    alert(data.message); // Show an alert with the message if data.restatus is 0
                  }
                });

              console.log(data.restatus);
            }}
          >
            Resource checkin
          </Button>
        </Form.Field>
      </Form>

      {/* {message} */}
    </div>
  );
};
