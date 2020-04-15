import axios from 'axios';

const requestUrl = process.env.REACT_APP_NODE_ENV === 'ganache'
  ? 'http://127.0.0.1:3001/api/contract'
  : 'http://exchange.azukigo.com/api/contract'; // backend api location

export const getContractInfos = async () => {
  try {
    const response = await axios.get(`${requestUrl}/infos`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTokenInfo = async (name, id) => {
  try {
    const response = await axios.get(`${requestUrl}/${name}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
