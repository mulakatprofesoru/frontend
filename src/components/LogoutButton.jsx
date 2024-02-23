import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import LogoutIcon from '@mui/icons-material/Logout';
import ProfileBox from "./ProfileBox";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <ProfileBox />);
};

export default LogoutButton;