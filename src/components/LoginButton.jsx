import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./LogoutButton";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <header>
    <h1>Mülakat Profesörü</h1>
    <div className="buttons">
        <button onClick={loginWithRedirect}>Log In</button>
        <LogoutButton />    
    </div>
  </header>

    );
};

export default LoginButton;