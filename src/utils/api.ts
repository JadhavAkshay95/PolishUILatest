import axios from 'axios';
import { API_KEY } from 'constants/config';

export const get = (url: string) => {
  return axios.get(`https://api.etherscan.io/api?apiKey=${API_KEY}&${url}`);
};
