import React from "react";
import { useState } from "react";
export default function App() {
  const getData = async () => {
    console.log("button is clicked");
    await fetch("http://127.0.0.1:5000/message", { mode: "cors" })
      .then((response) => response.text())
      .then((result) => console.log(result));
    // .catch(error => console.log(error))
  };

  const getJson = async () => {
    await fetch("http://127.0.0.1:5000/json", { mode: "cors" })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        console.log(result.today);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getUser = async () => {
    await fetch("http://127.0.0.1:5000/user", { mode: "cors" })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        console.log(result.username);
        console.log(result.name);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [info, setInfo] = useState([]);
  const getGrades = async () => {
    await fetch("http://127.0.0.1:5000/user", { mode: "cors" })
      .then((response) => response.json())
      .then((result) => {
        setInfo(result.name);
      })
      .catch((error) => console.log(error));
  };

  const getModify = async () => {
    await fetch("http://127.0.0.1:5000/modify", {
      method: "POST",
      mode: "cors",
      body: "what a nice day",
    })
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  };

  // const getModifyJson = async () => {
  //   await fetch("http://127.0.0.1:5000/modifyjson", {
  //     method: "POST",
  //     mode: "cors",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify(jsonData), // 将json格式化为string
  //   })
  //     .then((response) => response.json())
  //     .then((result) => console.log(result))
  //     .catch((error) => console.log(error));
  // };

  return (
    <div>
      <button onClick={getModify}>Click to get Json message</button>

      <button onClick={getUser}>Click to get User message</button>
    </div>
  );
}
