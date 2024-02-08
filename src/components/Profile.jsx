import React, { useEffect} from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user} = useAuth0();

  const formData= new FormData();

  useEffect(()=> {
  const sendPostRequest = async () => {
    try {
      formData.append('email', user.email);
      formData.append('password', user.email);
      console.log(user)
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

};

export default Profile;