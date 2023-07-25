import React,{useState,useEffect} from 'react'
import { Button } from 'semantic-ui-react'

function HWButton() {
    const [data, setData] = useState([{}])

    const [message,setMessage] = useState("Current HW status")

    
  return (
    <div>
    <Button onClick={async() => {

fetch("/hardware").then(
    res => res.json()
).then(
    data =>{
        setData(data)
        console.log(data)
        }

)

setMessage(
<div className="col">
<h1>Current hardware resource:</h1>
{data.map(hw => <div><p>Hardware: {hw.hwID}</p>
<p>Availability: {hw.availability}</p>
<p>Capacity: {hw.capacity}</p>
<p>Checkedout:{hw.checkedout}</p>
<hr></hr>
</div>)}
  </div>
  )
console.log(message)

}}> Check HW
    
        </Button>
        {message}
        </div>
  )
}

export default HWButton