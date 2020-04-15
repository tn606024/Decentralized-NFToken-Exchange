export const TokenFaucetUrl = process.env.REACT_APP_NODE_ENV === 'ganache'
  ? 'http://127.0.0.1:3002'
  : 'http://faucet.azukigo.com';
