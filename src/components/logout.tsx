import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import ConfirmationModal from "./confirm";
import '../styles/logout.scss';
import artifLogoutIcon from "../assets/images/logout-icon.svg";

const Logout = ({onLogoutClick, onLogoutConfirmed, onLogoutCanceled}:any) => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const {logout} = useAuth();

  const handleLogoutClick = () => {
    setShowConfirmationModal(true);
  }

  const handleLogoutConfirmed = () => {
    setShowConfirmationModal(false);
    logout();

  };
  const handleLogoutCanceled = () => {
    setShowConfirmationModal(false);
   
  };
  return (
    <div>
      <a onClick={handleLogoutClick}>Logout</a>
      {showConfirmationModal && (
        <ConfirmationModal
          message="Deseja realmente fazer logout?"
          onConfirm={handleLogoutConfirmed}
          onCancel={handleLogoutCanceled}
        />
      )}
    </div>
  );
}

export default Logout;
