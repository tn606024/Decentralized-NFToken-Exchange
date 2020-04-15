import axios from 'axios';

const requestUrl = process.env.REACT_APP_NODE_ENV === 'ganache'
  ? 'http://127.0.0.1:3001/api/history'
  : 'http://exchange.azukigo.com/api/history';

export const getUserSendInHistory = async (address) => {
  try {
    const response = await axios.get(`${requestUrl}/receive/${address}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserSendBackHistory = async (address) => {
  try {
    const response = await axios.get(`${requestUrl}/sendback/${address}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserExchangeHistory = async (address) => {
  try {
    const response = await axios.get(`${requestUrl}/exchange/${address}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
