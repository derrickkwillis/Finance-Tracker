"use client";

import React, { useState } from "react";
import styled from "styled-components";
import AddTransactionModal from "@/components/AddTransactionComponent";
import CreateSavingsPlanModal from "@/components/CreateSavingsPlanModal";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTransactionModalOpen, setTransactionModalOpen] = useState(false);
  const [isSavingsPlanModalOpen, setSavingsPlanModalOpen] = useState(false);

  const handleAddTransactionClick = () => {
    setTransactionModalOpen(true);
  };

  const handleSavingsPlanClick = () => {
    setSavingsPlanModalOpen(true);
  };

  return (
    <StyledWrapper>
      <div className="overlay" />
      <div className="parent">
        <div className="div1">
          <h2>Recent Transactions</h2>
          <p>List of latest income and expenses.</p>
        </div>
        <div className="div2">
          <h2>Cash Flow</h2>
          <p>Track your income vs. expenses.</p>
        </div>
        <div className="div3">
          <h2>Balance Overview</h2>
          <p>In/Out balance for this month.</p>
        </div>
        <div className="div4">
          <h2>Saving Goals</h2>
          <p>Summary of active savings goals.</p>
        </div>
        <div className="div5">
          <h2>Monthly Savings Trend</h2>
          <p>Track savings from the last few months.</p>
        </div>
      </div>
      {/* Floating Action Button */}
      <div className="fab-container">
        <button className="fab" onClick={() => setIsOpen(!isOpen)}>
          +
        </button>
        <div className={`fab-options ${isOpen ? "open" : ""}`}>
          <button className="fab-option" onClick={handleAddTransactionClick}>
            Add Transaction
          </button>
          <button className="fab-option" onClick={handleSavingsPlanClick}>
            Create New Savings Plan
          </button>
          <button className="fab-option logout-btn">Logout</button>
        </div>
      </div>
      <AddTransactionModal
        isOpen={isTransactionModalOpen}
        onClose={() => setTransactionModalOpen(false)}
        onSubmit={(data) => console.log("Transaction Added:", data)}
      />
      <CreateSavingsPlanModal
        isOpen={isSavingsPlanModalOpen}
        onClose={() => setSavingsPlanModalOpen(false)}
        onSubmit={(data) => console.log("Savings Plan Created:", data)}
      />
      ;
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

  .parent {
    display: grid;
    width: 90%;
    height: 90%;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(5, 1fr);
    grid-column-gap: 10px;
    grid-row-gap: 10px;
    position: relative;
    z-index: 10;
  }

  .div1 {
    grid-area: 3 / 2 / 6 / 6;
  }
  .div2 {
    grid-area: 1 / 2 / 3 / 6;
  }
  .div3 {
    grid-area: 1 / 1 / 2 / 2;
  }
  .div4 {
    grid-area: 2 / 1 / 4 / 2;
  }
  .div5 {
    grid-area: 4 / 1 / 6 / 2;
  }

  .parent div {
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .parent h2 {
    color: rgb(49, 98, 179);
    font-size: 1.5rem;
    margin-bottom: 5px;
  }

  .parent p {
    color: #555;
    font-size: 1rem;
  }

  .fab-container {
    position: fixed;
    bottom: 20px;
    right: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    z-index: 100;
  }

  .fab {
    width: 60px;
    height: 60px;
    background-color: rgb(49, 98, 179);
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 24px;
    font-weight: bold;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease, background-color 0.3s ease;
  }

  .fab:hover {
    background-color: rgb(39, 78, 149);
  }

  .fab-options {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.3s ease, transform 0.3s ease;
    position: absolute;
    bottom: 70px;
    right: 10px;
    color: rgb(39, 78, 149);
  }

  .fab-options.open {
    opacity: 1;
    transform: translateY(0);
  }

  .fab-option {
    background: white;
    border: 1px solid #ccc;
    padding: 10px 15px;
    margin-bottom: 8px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    transition: background 0.3s ease, color 0.3s ease;
    width: auto;
    white-space: nowrap;
    min-width: 100px;
  }

  .fab-option:hover {
    background: rgb(49, 98, 179);
    color: white;
  }

  .logout-btn {
    background: red;
    color: white;
    border: 1px solid red;
  }

  .logout-btn:hover {
    background: white;
    color: red;
    border: 1px solid red;
  }
`;

export default Dashboard;
