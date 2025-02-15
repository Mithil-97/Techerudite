import React from "react";
import { useNavigate } from "react-router-dom";

const RegisterSelection = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Select Registration Type</h2>
      <button onClick={() => navigate("/register/admin")}>
        Register as Admin
      </button>
      <button onClick={() => navigate("/register/customer")}>
        Register as Customer
      </button>
      <button onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
};

export default RegisterSelection;
