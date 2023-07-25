import React, { useState } from "react";
import { Form, Input, Button } from "semantic-ui-react";
import { Navigate } from "react-router-dom";

export const HwCheckoutForm = () => {
  const [projectIDCheckout, setProjectIDCheckout] = useState("");
  const [hw1Checkout, sethw1Checkout] = useState(0);
  const [hw2Checkout, sethw2Checkout] = useState(0);

  const [data, setData] = useState([{}]);

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
          ></Input>
          HW1
          <Input
            placeholder="hw1Checkout"
            value={hw1Checkout}
            onChange={(e) => sethw1Checkout(e.target.value)}
          ></Input>
          HW2
          <Input
            placeholder="hw2Checkout"
            value={hw2Checkout}
            onChange={(e) => sethw2Checkout(e.target.value)}
          ></Input>
        </Form.Field>
        <Form.Field>
          <Button
            onClick={async () => {
              const hardwareCheckout = {
                projectIDCheckout,
                hw1Checkout,
                hw2Checkout,
              };

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
                  console.log(typeof data);
                });

              // if (data.restatus === '1'){
              //     console.log('good')
              //     setMessage(
              //         <div>
              //         <p>Project ID : {data.pID}</p>
              //         <p>hw1_checked : {data.hw1_checked}</p>
              //         <p>hw2_checked : {data.hw2_checked}</p>
              //         </div>
              //     )

              // }else{
              //     console.log('wrong')
              //     setMessage(
              //         <div>
              //         <p>Can't find it!</p>

              //         </div>
              //     )
              // }
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
