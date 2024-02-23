import React, { useState } from 'react';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
const ProfileBox = () => {
  const [modalAcik, setModalAcik] = useState(false);

  const modalAcKapa = () => {
    modalAcik===true?setModalAcik(false):setModalAcik(true);
  };

  return (
    <div>
      <AccountBoxIcon onClick={modalAcKapa}/>

      {modalAcik && (
        <div className="modal">
            <button>History</button>
            <button>Logout</button>
          </div>
      )}
    </div>
  );
};

export default ProfileBox;