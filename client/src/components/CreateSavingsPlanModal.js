"use client";

import React, { useState } from "react";
import styled from "styled-components";

const CreateSavingsPlanModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    goalName: "",
    targetAmount: "",
    percentage: "",
    interval: "monthly", // Default interval
  });

  // Format amount input with commas
  const formatAmount = (value) => {
    const numericValue = value.replace(/[^0-9.]/g, "");
    const parts = numericValue.split(".");
    if (parts.length > 2) return formData.targetAmount; // Prevent multiple decimal points
    if (parts.length === 2 && parts[1].length > 2)
      parts[1] = parts[1].substring(0, 2);
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.length === 2 ? `${integerPart}.${parts[1]}` : integerPart;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "targetAmount") {
      setFormData({ ...formData, targetAmount: formatAmount(value) });
    } else if (name === "percentage") {
      const percentValue = value.replace(/[^0-9]/g, ""); // Allow only numbers
      if (
        percentValue === "" ||
        (Number(percentValue) >= 0 && Number(percentValue) <= 100)
      ) {
        setFormData({ ...formData, percentage: percentValue });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const sanitizedAmount = parseFloat(formData.targetAmount.replace(/,/g, ""));
    onSubmit({ ...formData, targetAmount: sanitizedAmount });
    setFormData({
      goalName: "",
      targetAmount: "",
      percentage: "",
      interval: "monthly",
    });
    onClose();
  };

  if (!isOpen) return null; // Do not render if modal is closed

  return (
    <ModalOverlay>
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <label>Goal Name</label>
          <input
            type="text"
            name="goalName"
            value={formData.goalName}
            onChange={handleChange}
            required
          />

          <label>Target Amount</label>
          <input
            type="text"
            name="targetAmount"
            value={formData.targetAmount}
            onChange={handleChange}
            required
          />

          <label>Percentage of Balance</label>
          <input
            type="text"
            name="percentage"
            value={formData.percentage}
            onChange={handleChange}
            placeholder="%"
            required
          />

          <label>Interval</label>
          <select
            name="interval"
            value={formData.interval}
            onChange={handleChange}
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>

          <button type="submit">Create Savings Plan</button>
          <button type="button" onClick={onClose} className="close-btn">
            Cancel
          </button>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
};

// Styled Components
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  width: 350px;
  border-radius: 10px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
  text-align: center;

  label {
    display: block;
    margin: 10px 0 5px;
    font-weight: bold;
    text-align: left;
    color: black;
  }

  input,
  select {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    color: black;
  }

  button {
    width: 100%;
    padding: 10px;
    margin-top: 10px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    font-size: 1rem;
  }

  button[type="submit"] {
    background-color: rgb(49, 98, 179);
    color: white;
  }

  .close-btn {
    background-color: #ccc;
    color: black;
  }
`;

export default CreateSavingsPlanModal;
