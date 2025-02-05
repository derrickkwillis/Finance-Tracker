"use client";

import React, { useState } from "react";
import styled from "styled-components";

const AddTransactionModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    amount: "0.00",
    category: "",
    type: "expense",
  });

  const expenseCategories = [
    "Food",
    "Rent",
    "Utilities",
    "Entertainment",
    "Shopping",
    "Transport",
  ];
  const incomeCategories = [
    "Salary",
    "Freelance",
    "Investments",
    "Gifts",
    "Other",
  ];

  const formatAmount = (value) => {
    const numericValue = value.replace(/[^0-9.]/g, "");

    const parts = numericValue.split(".");
    if (parts.length > 2) {
      return formData.amount;
    }

    if (parts.length === 2 && parts[1].length > 2) {
      parts[1] = parts[1].substring(0, 2);
    }

    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const formattedValue =
      parts.length === 2 ? `${integerPart}.${parts[1]}` : integerPart;

    return formattedValue;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "amount") {
      const formatted = formatAmount(value);
      setFormData({ ...formData, amount: formatted });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const sanitizedAmount = parseFloat(formData.amount.replace(/,/g, "")); // Remove commas before sending
    onSubmit({ ...formData, amount: sanitizedAmount });
    setFormData({ amount: "", category: "", type: "expense" }); // Reset form
    onClose();
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <label>Amount</label>
          <input
            type="text"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />

          <label>Type</label>
          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>

          <label>Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a Category</option>
            {(formData.type === "expense"
              ? expenseCategories
              : incomeCategories
            ).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <button type="submit">Add Transaction</button>
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

export default AddTransactionModal;
