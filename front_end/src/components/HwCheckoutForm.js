import React, { useState } from "react";
import { Form, Input, Button } from "semantic-ui-react";

export const HwCheckoutForm = () => {
  // State for the projectID, hw1Checkout, and hw2Checkout input fields
  const [projectIDCheckout, setProjectIDCheckout] = useState("");
  const [hw1Checkout, sethw1Checkout] = useState(0);
  const [hw2Checkout, sethw2Checkout] = useState(0);

  // State to store the data from the server response
  const [data, setData] = useState([{}]);

  // State to handle the message displayed based on the server response
  const [message, setMessage] = useState();

  return (
    <div>
      <Form>
        <Form.Field>
          Project ID :
          <Input
            placeholder="project ID"
            value={projectIDCheckout}
            onChange={(e) => setProjectIDCheckout(e.target.value)}
          />
          HW1
          <Input
            placeholder="hw1Checkout"
            value={hw1Checkout}
            onChange={(e) => sethw1Checkout(e.target.value)}
          />
          HW2
          <Input
            placeholder="hw2Checkout"
            value={hw2Checkout}
            onChange={(e) => sethw2Checkout(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <Button
            onClick={async () => {
              const hardwareCheckout = {
                projectIDCheckout,
                hw1Checkout,
                hw2Checkout,
              };

              // Send a POST request to the server with hardwareCheckout data and update the data state with the server response
              fetch("/hwcheckout", {
                method: "POST",
                headers: {
                  "Content-Type": "application.json",
                },
                body: JSON.stringify(hardwareCheckout),
              })
                .then((response) => response.json())
                .then((data) => {
                  setData(data);
                  console.log(data);
                  if (data.restatus === 1) {
                    alert("Successfully Checked out"); // Show an alert if data.restatus is 1
                  } else if (data.restatus === 0) {
                    alert("Failed to Checked out"); // Show an alert if data.restatus is 0
                  }
                });
            }}
          >
            Resource checkout
          </Button>
        </Form.Field>
      </Form>

      {/* {message} */}
    </div>
  );
};
