import React, { useState } from 'react';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useAuth0 } from "@auth0/auth0-react";
const ProfileBox = (props) => {
  const { logout } = useAuth0();
  const [modalAcik, setModalAcik] = useState(false);

  const modalAcKapa = () => {
    modalAcik===true?setModalAcik(false):setModalAcik(true);
  };

  const sendLogoutInfo = async () => {
    try {
      logout();
      const response = await fetch('http://localhost:5000/api/users/logout', {
          method: 'POST',
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

  return (
    
    <div>
      <AccountBoxIcon onClick={modalAcKapa}/>
    <div>
        {modalAcik && (
          <div className="profile-menu">
            <button onClick={props.history}>History</button>
            <button onClick={sendLogoutInfo}>Logout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileBox;