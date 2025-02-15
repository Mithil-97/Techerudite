import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const VerifyEmail = () => {
  const { token } = useParams();
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}verify/${token}`)
      .then((response) => setMessage(response.data))
      .catch((error) =>
        setMessage(error.response?.data || "Verification failed")
      );
  }, [token]);

  return <h2>{message}</h2>;
};

export default VerifyEmail;
