import React from 'react'
function App_input(){
    

    function handleSubmit(e) {
        // Prevent the browser from reloading the page
        e.preventDefault();

        // Read the form data
        const form = e.target;
        const formData = new FormData(form);

        // You can pass formData as a fetch body directly:
        fetch("http://127.0.0.1:5000/modify", {
            method: 'POST',
            mode: 'cors',
            body: formJson["username"]
        })
        .then(response => response.text())            
        .then(result => console.log(result))
        .catch(error => console.log(error));

        

        // Or you can work with it as a plain object:
        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);

        const getModify = async() => {
            await fetch("http://127.0.0.1:5000/modify", {
                method: 'POST',
                mode: 'cors',
                body: formJson["username"]
            })
            .then(response => response.text())            
            .then(result => console.log(result))
            .catch(error => console.log(error))
          };
    }
    // const getModify = async() => {
    //     await fetch("http://127.0.0.1:5000/modify", {
    //         method: 'POST',
    //         mode: 'cors',
    //         body: formJson
    //     })
    //     .then(response => response.text())            
    //     .then(result => console.log(result))
    //     .catch(error => console.log(error))
    //   }
  

        // const getModifyJson = async () => {
        //     await fetch("http://127.0.0.1:5000/modifyjson", {
        //       method: "POST",
        //       mode: "cors",
        //       headers: {
        //         "content-type": "application/json",
        //       },
        //       body: JSON.stringify(formJson), // 将json格式化为string
        //     })
        //       .then((response) => response.json())
        //       .then((result) => console.log(result))
        //       .catch((error) => console.log(error));
        //   };

    

    return (
        <form method="post" onSubmit={handleSubmit}>
            <label>
                username: <input name="username" />
            </label>
            <label>
                Password: <input name="password" />
            </label>
            <hr />
            <button type="reset">reset</button>
            <button type="submit">submit</button>
        </form>
    
    )

} 

export default App_input;