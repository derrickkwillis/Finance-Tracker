"use client";

import React, { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { registerUser } from "../utils/api";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const { confirmPassword, ...userData } = formData;
      await registerUser(userData);
      router.push("/login");
    } catch (err) {
      setError(err.error);
    }
  };

  return (
    <StyledWrapper>
      <div className="overlay" />
      <form className="form" onSubmit={handleSubmit}>
        <p className="form-title">Create your account</p>
        {error && <p className="error-message">{error}</p>}
        <div className="input-container">
          <input
            type="text"
            name="username"
            placeholder="Enter username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-container">
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit">
          Sign up
        </button>
        <p className="signup-link">
          Already have an account?{" "}
          <Link href="/login" className="link-text">
            Sign in
          </Link>
        </p>
      </form>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(
    to bottom right,
    rgba(207, 217, 223, 0.8),
    rgba(226, 235, 240, 0.8)
  );

  position: relative;

  .overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(8px);
  }

  .form {
    position: relative;
    background-color: #fff;
    padding: 2rem;
    max-width: 350px;
    border-radius: 0.5rem;
    box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.1);
    z-index: 10;
  }

  .form-title {
    font-size: 1.25rem;
    font-weight: 600;
    text-align: center;
    color: #000;
    margin-bottom: 1rem;
  }

  .input-container {
    margin-bottom: 1rem;
  }

  .input-container input {
    width: 100%;
    padding: 0.75rem;
    font-size: 0.875rem;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    outline: none;
  }

  .submit {
    width: 100%;
    padding: 0.75rem;
    background-color: rgb(49, 98, 179);
    color: #ffffff;
    font-size: 0.875rem;
    font-weight: 500;
    border-radius: 0.5rem;
    text-transform: uppercase;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .submit:hover {
    background-color: rgb(39, 78, 149);
  }

  .signup-link {
    text-align: center;
    color: #6b7280;
    font-size: 0.875rem;
    margin-top: 1rem;
  }

  .link-text:hover {
    color: rgb(49, 98, 179);
  }

  .link-text {
    color: rgb(49, 98, 179);
    text-decoration: underline;
    cursor: pointer;
  }

  .error-message {
    color: red;
    text-align: center;
    font-size: 0.875rem;
    margin-bottom: 1rem;
  }
`;

export default SignUpPage;
