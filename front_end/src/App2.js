import React, { useEffect, useState } from "react";
import { NewUserForm } from "./components/NewUserForm";
import { Alert } from "react-native";

function App2() {
  const [isTextVisible, setIsTextVisible] = useState(false);

  const handleButtonClick = () => {
    if (isTextVisible === false) {
      setIsTextVisible(!isTextVisible); // Toggle the value of isTextVisible
    }
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Toggle Text</button>
      {isTextVisible && <NewUserForm />}
    </div>
  );
}

export default App2;
