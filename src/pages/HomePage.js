import React from "react";
import LoginButton from "../components/LoginButton.jsx";
import Home from "../components/Home.jsx";
import Profile from "../components/Profile.jsx";
function HomePage(){
  return (
    <div>
      <LoginButton />
      <Profile />  
      <Home />
    </div>
    );
};

export default HomePage;