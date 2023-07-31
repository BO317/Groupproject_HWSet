## API Documentation for React.js Frontend Engineers

This API documentation provides details on various endpoints and functions that React.js frontend engineers can use to interact with the backend server effectively.

### 1. Hardware Information Endpoint

- **Endpoint:** `/hardware`
- **Description:** Allows clients to retrieve hardware information from the server.
- **Method:** GET
- **Output:** Returns hardware information in JSON format. The output is a list of dictionaries, each representing hardware data.

**Usage Example (React.js - Fetch API):**

```jsx
import React, { useEffect, useState } from "react";

const HardwareInfoComponent = () => {
  const [hardwareData, setHardwareData] = useState([]);

  useEffect(() => {
    fetch("/hardware")
      .then((response) => response.json())
      .then((data) => {
        // Handle the hardware data here
        setHardwareData(data);
      })
      .catch((error) => {
        // Handle any error that occurs during the API call
        console.error("Error:", error);
      });
  }, []);

  return <div>{/* Render the hardware data here */}</div>;
};

export default HardwareInfoComponent;
```

### 2. New Project Creation Endpoint

- **Endpoint:** `/newproject`
- **Description:** Enables clients to create a new project.
- **Method:** POST
- **Input:** JSON data in the POST request body containing the `projectID` key.
- **Output:** Returns JSON data representing the result of creating a new project. The output includes a key `restatus` indicating the success or failure of the operation.

**Usage Example (React.js - Fetch API):**

```jsx
import React, { useState } from "react";

const NewProjectComponent = () => {
  const [projectID, setProjectID] = useState("");
  const [result, setResult] = useState(null);

  const handleCreateProject = () => {
    const newProjectData = { projectID: projectID };

    fetch("/newproject", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProjectData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data here
        setResult(data);
      })
      .catch((error) => {
        // Handle any error that occurs during the API call
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <input
        type="text"
        value={projectID}
        onChange={(e) => setProjectID(e.target.value)}
      />
      <button onClick={handleCreateProject}>Create Project</button>
      {result && <div>{/* Render the result data here */}</div>}
    </div>
  );
};

export default NewProjectComponent;
```

### 3. Project Query Endpoint

- **Endpoint:** `/queryproject`
- **Description:** Allows clients to query existing projects based on the provided project ID.
- **Method:** POST
- **Input:** JSON data in the POST request body containing the `projectID` key.
- **Output:** Returns JSON data representing the queried project information. The output includes a key `restatus` indicating the success or failure of the query.

**Usage Example (React.js - Fetch API):**

```jsx
import React, { useState } from "react";

const QueryProjectComponent = () => {
  const [projectID, setProjectID] = useState("");
  const [projectData, setProjectData] = useState(null);

  const handleQueryProject = () => {
    const queryData = { projectID: projectID };

    fetch("/queryproject", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(queryData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the queried project data here
        setProjectData(data);
      })
      .catch((error) => {
        // Handle any error that occurs during the API call
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <input
        type="text"
        value={projectID}
        onChange={(e) => setProjectID(e.target.value)}
      />
      <button onClick={handleQueryProject}>Query Project</button>
      {projectData && <div>{/* Render the project data here */}</div>}
    </div>
  );
};

export default QueryProjectComponent;
```

### 4. Hardware Checkout Endpoint

- **Endpoint:** `/hwcheckout`
- **Description:** Enables clients to perform hardware checkout for a project.
- **Method:** POST
- **Input:** JSON data in the POST request body containing `projectIDCheckout`, `hw1Checkout`, and `hw2Checkout` keys.
- **Output:** Returns JSON data representing the result of hardware checkout for a project. The output includes a key `restatus` indicating the success or failure of the operation.

**Usage Example (React.js - Fetch API):**

```jsx
import React, { useState } from 'react';

const HardwareCheckoutComponent = () => {
  const [projectID, setProjectID] = useState('');
  const [hw1Checkout, setHw1Checkout] = useState('');
  const [hw2Checkout, setHw2Checkout] = useState('');
  const [result, setResult] = useState(null);

  const handleHardwareCheckout = () => {
    const checkoutData = {
      "projectIDCheckout": projectID,
      "hw1Checkout": parseInt(hw1Checkout),
      "hw2Checkout": parseInt(hw2Checkout)
    };

    fetch('/hwcheckout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(checkoutData)
    })
      .then(response => response.json())
      .then(data => {
        // Handle the hardware checkout response data here
        setResult(data);
      })
      .catch(error => {
        // Handle any error that occurs during the API call
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <input type="text" value={projectID} onChange={e => setProjectID(e.target.value)} />
      <input type="text" value={hw1Checkout} onChange={e => setHw1Checkout(e.target.value)} />
      <input type="text" value={hw2Checkout} onChange={e => setHw2Checkout(e.target.value)} />
      <button onClick={handleHardwareCheckout}>Hardware Checkout</button>
      {result && (
        <div>
          {/* Render the result data here */}
```

### 5. Hardware Check-in Endpoint

- **Endpoint:** `/hwcheckin`
- **Description:** Allows clients to check in hardware for a project.
- **Method:** POST
- **Input:** JSON data in the POST request body containing `projectIDCheckIn`, `hw1Checkin`, and `hw2Checkin` keys.
- **Output:** Returns JSON data representing the result of hardware check-in for a project. The output includes a key `restatus` indicating the success or failure of the operation.

**Usage Example (React.js - Fetch API):**

```jsx
import React, { useState } from "react";

const HardwareCheckinComponent = () => {
  const [projectID, setProjectID] = useState("");
  const [hw1Checkin, setHw1Checkin] = useState("");
  const [hw2Checkin, setHw2Checkin] = useState("");
  const [result, setResult] = useState(null);

  const handleHardwareCheckin = () => {
    const checkinData = {
      projectIDCheckIn: projectID,
      hw1Checkin: parseInt(hw1Checkin),
      hw2Checkin: parseInt(hw2Checkin),
    };

    fetch("/hwcheckin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(checkinData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the hardware check-in response data here
        setResult(data);
      })
      .catch((error) => {
        // Handle any error that occurs during the API call
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <input
        type="text"
        value={projectID}
        onChange={(e) => setProjectID(e.target.value)}
      />
      <input
        type="text"
        value={hw1Checkin}
        onChange={(e) => setHw1Checkin(e.target.value)}
      />
      <input
        type="text"
        value={hw2Checkin}
        onChange={(e) => setHw2Checkin(e.target.value)}
      />
      <button onClick={handleHardwareCheckin}>Hardware Check-in</button>
      {result && <div>{/* Render the result data here */}</div>}
    </div>
  );
};

export default HardwareCheckinComponent;
```

### 6. User Query Endpoint

- **Endpoint:** `/queryuser`
- **Description:** Enables clients to query user information based on the provided credentials.
- **Method:** POST
- **Input:** JSON data in the POST request body containing user query information (e.g., username and password).
- **Output:** Returns JSON data representing the queried user information. The output includes a key `restatus` indicating the success or failure of the query.

**Usage Example (React.js - Fetch API):**

```jsx
import React, { useState } from "react";

const UserQueryComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState(null);

  const handleUserQuery = () => {
    const userData = {
      username: username,
      password: password,
    };

    fetch("/queryuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the user query response data here
        setResult(data);
      })
      .catch((error) => {
        // Handle any error that occurs during the API call
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleUserQuery}>Query User</button>
      {result && <div>{/* Render the result data here */}</div>}
    </div>
  );
};

export default UserQueryComponent;
```

### 7. User Loader Function

- **Function:** user_loader(username)
- **Description:** Part of Flask-Login's functionality. Takes a username as input and returns a User object representing the logged-in user.
- **Input:** The function takes the username of the user as input.
- **Output:** Returns a User object that represents the logged-in user.

### 8. Logout Endpoint

- **Endpoint:** `/logout`
- **Description:** Allows users to log out of the application.
- **Method:** POST
- **Input:** None (POST request)
- **Output:** Returns a JSON message indicating that the user has been successfully logged out.

**Usage Example (React.js - Fetch API):**

```jsx
import React, { useState } from "react";

const LogoutComponent = () => {
  const handleLogout = () => {
    fetch("/logout", {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the logout response data here
      })
      .catch((error) => {
        // Handle any error that occurs during the API call
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default LogoutComponent;
```

### 9. User Information Endpoint

- **Endpoint:** `/user_info`
- **Description:** Allows clients to retrieve information about the currently logged-in user.
- **Method:** GET
- **Input:** None (GET request)
- **Output:** Returns JSON data containing information about the currently logged-in user. The output includes a key `username` with the username of the logged-in user and a key `isLoggedIn` indicating whether the user is logged in or not.

**Usage Example (React.js - Fetch API):**

```jsx
import React, { useEffect, useState } from "react";

const UserInfoComponent = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    fetch("/user_info")
      .then((response) => response.json())
      .then((data) => {
        // Handle the user information data here
        setUserInfo(data);
      })
      .catch((error) => {
        // Handle any error that occurs during the API call
        console.error("Error:", error);
      });
  }, []);

  return (
    <div>{userInfo && <div>{/* Render the user information here */}</div>}</div>
  );
};

export default UserInfoComponent;
```

### 10. New User Creation Endpoint

- **Endpoint:** `/newuser`
- **Description:** Enables clients to create a new user account.
- **Method:** POST
- **Input:** JSON data in the POST request body containing new user information (e.g., username, password, etc.).
- **Output:** Returns JSON data representing the result of creating a new user. The output includes a key `restatus` indicating the success or failure of the operation.

**Usage Example (React.js - Fetch API):**

```jsx
import React, { useState } from "react";

const NewUserComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState(null);

  const handleNewUser = () => {
    const newUser = {
      username: username,
      password: password,
    };

    fetch("/newuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the new user creation response data here
        setResult(data);
      })
      .catch((error) => {
        // Handle any error that occurs during the API call
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleNewUser}>Create New User</button>
      {result && <div>{/* Render the result data here */}</div>}
    </div>
  );
};

export default NewUserComponent;
```

### 11. Index Route

- **Route:** `/`
- **Description:** Serves the `index.html` file.

### 12. Error Handler for 404

- **Route:** `/errorhandler`
- **Description:** Handles 404 errors and serves the `index.html` file.

Frontend developers can use these APIs to interact with the backend server and build a comprehensive frontend application that manages projects and hardware effectively.
