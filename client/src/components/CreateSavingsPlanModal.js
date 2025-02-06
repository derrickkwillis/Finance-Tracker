"use client";

import React, { useState, useRef } from "react";
import styled from "styled-components";

const CreateSavingsPlanModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    goalName: "",
    targetAmount: "",
    percentage: "",
    interval: "monthly",
  });

  const percentageInputRef = useRef(null);

  // Format amount input with commas
  const formatAmount = (value) => {
    const numericValue = value.replace(/[^0-9.]/g, "");
    const parts = numericValue.split(".");
    if (parts.length > 2) return formData.targetAmount;
    if (parts.length === 2 && parts[1].length > 2)
      parts[1] = parts[1].substring(0, 2);
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.length === 2 ? `${integerPart}.${parts[1]}` : integerPart;
  };

  const formatPercentage = (value) => {
    let numericValue = value.replace(/[^0-9]/g, "");

    if (numericValue === "") return "";
    let num = Number(numericValue);
    if (num > 100) num = 100;

    return `${num}`;
  };

  const handlePercentageChange = (e) => {
    const newValue = formatPercentage(e.target.value);
    setFormData((prev) => ({ ...prev, percentage: newValue }));

    setTimeout(() => {
      if (percentageInputRef.current) {
        percentageInputRef.current.setSelectionRange(
          newValue.length,
          newValue.length
        );
      }
    }, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const sanitizedAmount = parseFloat(formData.targetAmount.replace(/,/g, ""));
    const sanitizedPercentage = parseFloat(formData.percentage); // Convert to number before submitting
    onSubmit({
      ...formData,
      targetAmount: sanitizedAmount,
      percentage: sanitizedPercentage,
    });
    setFormData({
      goalName: "",
      targetAmount: "",
      percentage: "",
      interval: "monthly",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <label>Goal Name</label>
          <input
            type="text"
            name="goalName"
            value={formData.goalName}
            onChange={(e) =>
              setFormData({ ...formData, goalName: e.target.value })
            }
            required
          />

          <label>Target Amount</label>
          <input
            type="text"
            name="targetAmount"
            value={formData.targetAmount}
            onChange={(e) =>
              setFormData({
                ...formData,
                targetAmount: formatAmount(e.target.value),
              })
            }
            required
          />

          <label>Percentage of Balance</label>
          <div className="percent-input">
            <input
              type="text"
              name="percentage"
              value={formData.percentage}
              onChange={handlePercentageChange}
              ref={percentageInputRef}
              required
            />
            <span>%</span>
          </div>

          <label>Interval</label>
          <select
            name="interval"
            value={formData.interval}
            onChange={(e) =>
              setFormData({ ...formData, interval: e.target.value })
            }
          >
            <option value="weekly">Weekly</option>
            <option value="biweekly">Bi-Weekly</option>
            <option value="monthly">Monthly</option>
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

  .percent-input {
    display: flex;
    align-items: center;
    position: relative;
  }

  .percent-input input {
    flex: 1;
    padding-right: 20px;
  }

  .percent-input span {
    position: absolute;
    right: 10px;
    color: black;
    font-weight: bold;
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
