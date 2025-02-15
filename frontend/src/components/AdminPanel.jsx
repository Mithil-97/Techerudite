import React from "react";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const navigate = useNavigate();
  return (
    <div>
      Welcome to Admin Panel
      <button onClick={() => navigate(-1)}>Logout</button>
    </div>
  );
};

export default AdminPanel;
