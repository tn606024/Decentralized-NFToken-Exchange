import axios from 'axios';

const requestUrl = process.env.REACT_APP_NODE_ENV === 'ganache'
  ? 'http://127.0.0.1:3001/api/event'
  : 'http://exchange.azukigo.com/api/event';

export const getUserWalletTokens = async (address) => {
  try {
    const response = await axios.get(`${requestUrl}/wallet/${address}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserNFTTokens = async (address) => {
  try {
    const response = await axios.get(`${requestUrl}/tokens/${address}`);
    console.log(response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserOrders = async (address) => {
  try {
    const response = await axios.get(`${requestUrl}/orders/${address}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserMatchOrders = async (address) => {
  try {
    const response = await axios.get(`${requestUrl}/matchOrders/${address}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getNFToken = async (id) => {
  try {
    const response = await axios.get(`${requestUrl}/token/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getChooseTokens = async (id, order) => {
  try {
    const response = await axios.get(`${requestUrl}/tokens/choose/${id}?order=${order}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getOpenOrders = async (addr) => {
  try {
    const response = await axios.get(`${requestUrl}/orders/open/${addr}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getOpenOrdersWithSearch = async (addr, search) => {
  try {
    const response = await axios.get(`${requestUrl}/orders/open/${addr}?search=${search}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
