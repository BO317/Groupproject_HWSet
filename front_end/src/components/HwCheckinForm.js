import React, { useState } from "react";
import { Form, Input, Button } from "semantic-ui-react";
import { Navigate } from "react-router-dom";

export const HwCheckinForm = () => {
  const [projectIDCheckIn, setProjectIDCheckin] = useState("");
  const [hw1Checkin, sethw1Checkin] = useState(0);
  const [hw2Checkin, sethw2Checkin] = useState(0);

  const [data, setData] = useState([{}]);

  const [message, setMessage] = useState();

  return (
    <div>
      <Form>
        <Form.Field>
          Project ID :
          <Input
            placeholder="project ID"
            value={projectIDCheckIn}
            onChange={(e) => setProjectIDCheckin(e.target.value)}
          ></Input>
          HW1
          <Input
            placeholder="hw1Checkin"
            value={hw1Checkin}
            onChange={(e) => sethw1Checkin(e.target.value)}
          ></Input>
          HW2
          <Input
            placeholder="hw2Checkin"
            value={hw2Checkin}
            onChange={(e) => sethw2Checkin(e.target.value)}
          ></Input>
        </Form.Field>
        <Form.Field>
          <Button
            onClick={async () => {
              const hardwareCheckin = {
                projectIDCheckIn,
                hw1Checkin,
                hw2Checkin,
              };

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
