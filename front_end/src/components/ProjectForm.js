import React,{useState} from "react";
import {Form,Input,Button} from "semantic-ui-react"
import { Navigate } from "react-router-dom";


export const  ProjectForm = () => {

    const [projectID, setProjectID] = useState("");
    // const [password, setPassword] = useState("");

    const [data, setData] = useState([{}])

    const [message,setMessage] = useState()

    
    return(
        
        <div>
        <Form>
            <Form.Field>
                Project ID :
                <Input placeholder = 'project ID' value ={projectID} onChange ={e => setProjectID(e.target.value)}></Input>
                {/* <Input placeholder = 'password' value ={password} onChange ={e => setPassword(e.target.value)}></Input> */}
            </Form.Field>
            <Form.Field>
                <Button onClick={async() => {

                    const project = {projectID}

                    fetch('/queryproject',{
                        method: 'POST',
                        headers:{
                            'Content-Type': 'application.json'
                        },
                        body: JSON.stringify(project)
                    }).then(response => response.json())
                    .then(data => { setData(data)
                        console.log(data)
                    })

                    console.log(data['restatus'])
                    console.log(data.restatus)

                    

                    

                    if (data.restatus === '1'){
                        console.log('good')
                        setMessage(
                            <div>
                            <p>Project ID : {data.pID}</p>
                            <p>hw1_checked : {data.hw1_checked}</p>
                            <p>hw2_checked : {data.hw2_checked}</p>
                            </div>
                        )

                    }else{
                        console.log('wrong')
                        setMessage(
                            <div>
                            <p>Can't find it!</p>
                            
                            </div>
                        )
                    }

                    
               
                   
             
                }}>
                Project Check
                    </Button> 
            </Form.Field>
        </Form>
        
        
        {message}


        
      </div>
    )

}


