import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const { role } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const x = { ...form, role };
    if (
      form.firstname !== "" ||
      form.lastname !== "" ||
      form.email !== "" ||
      form.password !== ""
    ) {
      await axios.post(`${process.env.REACT_APP_BASE_URL}register`, x);
      alert("Registration successful! Check your email for verification.");
    }
  };

  const handleGoBack = () => {
    setForm({ firstname: "", lastname: "", email: "", password: "" });
    navigate(-1);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register as {role}</h2>
      <input
        name="firstname"
        placeholder="First Name"
        onChange={handleChange}
        required
      />
      <input
        name="lastname"
        placeholder="Last Name"
        onChange={handleChange}
        required
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        onChange={handleChange}
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        required
      />
      <button type="submit">Register</button>
      <button onClick={handleGoBack}>Go Back</button>
    </form>
  );
};

export default Register;
