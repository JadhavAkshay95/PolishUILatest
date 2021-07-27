import axios from 'axios';

const MASTER_KEY = '3RvaxkOMvLKBl9nEhvVGiCEcfC9dgq4FHvY0oC9a';
export const BSC_SERVER = 'https://d9bacnhyykqs.moralis.io:2053/api/';

export const generateToken = async () => {
  try {
    const jwt = await axios.post(
      `${BSC_SERVER}account/generateToken?key=${MASTER_KEY}`,
    );
    if (!jwt?.data) {
      return null;
    }
    localStorage.setItem('MORALIS_TOKEN', jwt.data);
    return jwt.data;
  } catch (e) {
    console.log('error connecting to moralis server', e);
    return null;
  }
};
