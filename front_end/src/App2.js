import React from "react";
import { Alert } from "react-native";

function App2() {
  return <div>{Alert.alert("这是标题", "这是描述文字")}</div>;
}

export default App2;
