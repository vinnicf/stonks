import React, { useEffect, useState } from 'react';
import axios from 'axios';



const fetchStocks = async () => {
    try {
        const response = await fetch('http://localhost:3000/stocks');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch stocks');
    }
};

const updateStockPrice = async (stockId, newPrice) => {
    try {
        const response = await axios.patch(`http://localhost:3000/stocks/${stockId}/`, { price: newPrice });
        return response.data;
    } catch (error) {
        console.error('Error updating stock price:', error);
        throw error;
    }
};

// Function to send PATCH request
const updateFinancialData = async (stockId, financialData) => {
    try {
        const response = await axios.patch(`http://localhost:3000/stocks/${stockId}/financials`, financialData);
        return response.data;
    } catch (error) {
        console.error('Error updating financial data:', error);
        throw error;
    }
};

const deleteFinancialData = async (stockId, financialId) => {
    try {
        await axios.delete(`http://localhost:3000/stocks/${stockId}/financials/${financialId}`);
        // Update your state or UI here after successful deletion
    } catch (error) {
        console.error('Error deleting financial data:', error);
        // Handle errors, maybe show a message to the user
    }
};



export default fetchStocks;
export { updateFinancialData, deleteFinancialData, updateStockPrice };
