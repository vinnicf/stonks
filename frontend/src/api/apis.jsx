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




export default fetchStocks;
export { updateFinancialData };
