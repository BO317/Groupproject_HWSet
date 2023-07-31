import React from "react";
import { UserForm } from "../components/UserForm";
import { Container } from "semantic-ui-react";
function Login() {
  return (
    <div>
      <Container>
        <h1>Welcome to Hardware Management System</h1>
        <UserForm></UserForm>
      </Container>
    </div>
  );
}

export default Login;
