import {React , useEffect} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LoginIcon from '@mui/icons-material/Login';
import ProfileBox from "./ProfileBox";


const LoginButton = (props) => {
  const { user , isAuthenticated,loginWithRedirect } = useAuth0();

  const formData= new FormData();

  useEffect(()=> {
  const sendPostRequest = async () => {
    try {
      formData.append('email', user.email);
      formData.append('password', user.email);
      const response = await fetch('http://localhost:5000/api/users/addUser', {
          method: 'POST',
          body: formData,
      });

      if (response.ok) {
          console.log('Data sent successfully to Flask using POST');
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
    <h1>Mülakat Profesörü</h1>
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