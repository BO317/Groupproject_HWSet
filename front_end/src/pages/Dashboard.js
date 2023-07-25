import React,{useState,useEffect} from "react";
import {ProjectForm} from '../components/ProjectForm' 
import {HwCheckoutForm} from '../components/HwCheckoutForm'
import HWButton from "../components/HWButton";
import { NewProject } from "../components/NewProject";

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
      <ProjectForm></ProjectForm>
      <NewProject></NewProject>
      <HwCheckoutForm></HwCheckoutForm>
      </div>
  )
}

export default Dashboard