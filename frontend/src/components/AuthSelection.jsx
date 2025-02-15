import React from "react";
import { useNavigate } from "react-router-dom";

const AuthSelection = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Welcome! Please Choose an Option</h2>
      <button onClick={() => navigate("/register-selection")}>Register</button>
      <button onClick={() => navigate("/admin-login")}>Admin Login</button>
    </div>
  );
};

export default AuthSelection;
