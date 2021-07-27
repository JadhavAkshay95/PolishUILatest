declare let window: any;
const { ethereum } = window;

export const checkMetaMaskInstallation = () => {
  if (typeof ethereum === 'undefined') {
    return false;
  }
  return true;
};

export const getAccounts = async () => {
  try {
    const accounts = await ethereum.request({
      method: 'eth_requestAccounts',
    });

    return accounts;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getBalance = async (address: string) => {
  try {
    const balance = await ethereum.request({
      method: 'eth_getBalance',
      params: [address, 'latest'],
    });

    return parseInt(balance, 16) / 1000000000000000000;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const sendTransaction = async (
  to: string,
  from: string,
  value: number,
) => {
  const transactionParameters = {
    from,
    to,
    value: (value * 1000000000000000000).toString(16),
  };

  try {
    const txHash = await ethereum.request({
      method: 'eth_sendTransaction',
      params: [transactionParameters],
    });
    return txHash;
  } catch (error) {
    console.error(error);
    return false;
  }
};
