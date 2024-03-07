import React, { useState } from 'react';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useAuth0 } from "@auth0/auth0-react";
const ProfileBox = (props) => {
  const { logout } = useAuth0();
  const [modalAcik, setModalAcik] = useState(false);

  const modalAcKapa = () => {
    modalAcik===true?setModalAcik(false):setModalAcik(true);
  };

  return (
    
    <div>
      <AccountBoxIcon onClick={modalAcKapa}/>
    <div>
        {modalAcik && (
          <div className="profile-menu">
            <button onClick={props.history}>History</button>
            <button onClick={logout}>Logout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileBox;