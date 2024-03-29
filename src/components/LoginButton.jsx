import {React , useEffect} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LoginIcon from '@mui/icons-material/Login';
import ProfileBox from "./ProfileBox";
import axios from "axios";


const LoginButton = (props) => {
  const { user , isAuthenticated,loginWithRedirect } = useAuth0();

  const formData= new FormData();

  useEffect(()=> {
  const sendPostRequest = async () => {
    try {
      formData.append('email', user.email);
      formData.append('password', user.email);
      const response = await axios.post('http://localhost:5000/api/users/addUser', formData);
      if (response.status ===200) {
          console.log('Sign up data sent successfully');
      } else {
          console.error('Failed to send data to Flask using POST');
      }
    } catch (error) {
      console.error('Error:', error);
    }
    try {
      formData.append('email', user.email);
      formData.append('password', user.email);
      const response = await axios.post('http://localhost:5000/api/users/login', formData);
      if (response.status ===200) {
          console.log('Login data sent successfully');
      } else {
          console.error('Failed to send data to Flask using POST');
      }
    } catch (error) {
      console.error('Error:', error);
    }

 }
 sendPostRequest();},[user]);

  return (
    <header>
    <h1><a href="/">Mülakat Profesörü</a></h1>
    <div className="buttons">
        {isAuthenticated === false ?<LoginIcon  fontSize={"large"} onClick={loginWithRedirect} /> : ""}
        {isAuthenticated === true ? <ProfileBox 
          history={props.history}
        /> : <br />}  
    </div>
  </header>

    );
};

export default LoginButton;