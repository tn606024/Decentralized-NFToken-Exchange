import React from 'react';

const navStyle = {
  backgroundColor: '#eafefb',
  borderRadius: '6px',
};

const SendHistory = ({ history }) => (
  <div className="mb-5  mx-5">
    <div className="row mb-3 py-2 px-2 justify-content-start" style={navStyle}>
      <div className="col-2">
        <div className="order-nav-text">contract</div>
      </div>
      <div className="col-2">
        <div className="order-nav-text">tokenId</div>
      </div>
      <div className="col-2">
        <div className="order-nav-text">block</div>
      </div>
    </div>
    {history.map(record => (
      <div className="row py-3 px-2">
        <div className="col-2 order-content-text">
          <p>{record.contractAddress.name}</p>
        </div>
        <div className="col-2 order-content-text">
          <p>{record.tokenId}</p>
        </div>
        <div className="col-2 order-content-text">
          <p>{record.block}</p>
        </div>
        <div className="col-6 history-detail-text">
          <a href={`https://ropsten.etherscan.io/tx/${record.transactionHash}`} target="_blank" rel="noopener noreferrer">Check the details</a>
          <span className="ml-2 oi oi-arrow-right" />
        </div>
      </div>
    ))}
  </div>
);

export default SendHistory;
