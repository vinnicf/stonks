import React, { useEffect, useState } from 'react';

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

export default fetchStocks;
