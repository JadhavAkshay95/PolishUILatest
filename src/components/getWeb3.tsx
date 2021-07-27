import { useEffect, useState } from "react";
import Web3 from "web3";

declare let window: any;

const useWeb3 = () => {
  const [web3, setWeb3] = useState<any | null>(null);

  useEffect(() => {
    var instance;
    if (window.ethereum) {
      // set up a new provider
      try {
        instance = new Web3(window.ethereum);
        console.log(instance);
      } catch (error) {
        console.error(error);
      }
    } else if (window.web3) {
      instance = new Web3(window.web3);
    } else {
      // fallback on localhost provider
      const provider = new Web3.providers.HttpProvider("http://127.0.0.1:7545");
      instance = new Web3(provider);
    }
    setWeb3(instance);
  }, []);
  return web3;
};

export default useWeb3;
