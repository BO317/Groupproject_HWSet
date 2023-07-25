import React, { useState, useEffect } from "react";
import { ProjectForm } from "../components/ProjectForm";
import { HwCheckoutForm } from "../components/HwCheckoutForm";
import HWButton from "../components/HWButton";
import { NewProject } from "../components/NewProject";
import { HwCheckinForm } from "../components/HwCheckinForm";

function Dashboard() {
  // const [data, setData] = useState([{}])

  //   useEffect(()=>{
  //       fetch("/hardware").then(
  //           res => res.json()
  //       ).then(
  //           data =>{
  //               setData(data)
  //               console.log(data)
  //           }
  //       )
  //   },[])

  return (
    <div className="col">
      <h1>Welcome to your Dashboard!</h1>
      <HWButton></HWButton>
      <h2>Check Project resource!</h2>
      <ProjectForm></ProjectForm>
      <hr></hr>
      <h2>Create Project!</h2>
      <NewProject></NewProject>
      <hr></hr>
      <h2>Hardware Resource Check Out!</h2>
      <HwCheckoutForm></HwCheckoutForm>
      <hr></hr>
      <h2>Hardware Resource Check In!</h2>
      <HwCheckinForm></HwCheckinForm>
    </div>
  );
}

export default Dashboard;
