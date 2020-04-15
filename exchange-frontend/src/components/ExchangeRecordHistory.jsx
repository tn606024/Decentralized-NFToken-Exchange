import React from 'react';

const navStyle = {
  backgroundColor: '#eafefb',
  borderRadius: '6px',
};

const ExchangeRecordHistory = ({ history, address }) => (
  <div className="mb-5 mx-5">
    <div className="row mb-3 py-2 px-2 justify-content-start" style={navStyle}>
      <div className="col-2">
        <div className="order-nav-text">action</div>
      </div>
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
      record.orderOwner === address
        ? (
          <div className="row  py-3 px-2 ">
            <div className="col-2  order-content-text">
              <p className="">Send</p>
              <p>Receive</p>
            </div>
            <div className="col-2  order-content-text">
              <p className="">{record.orderContractAddress.name}</p>
              <p>{record.matchOrderContractAddress.name}</p>
            </div>
            <div className="col-2  order-content-text">
              <p className="">{record.orderTokenId}</p>
              <p>{record.matchOrderTokenId}</p>
            </div>
            <div className="col-2 order-content-text mt-3">
              <p>{record.block}</p>
            </div>
            <div className="col-4 history-detail-text mt-3">
              <a href={`https://ropsten.etherscan.io/tx/${record.transactionHash}`} target="_blank" rel="noopener noreferrer">Check the details</a>
              <span className="ml-2 oi oi-arrow-right" />
            </div>
          </div>
        )
        : (
          <div className="row  py-3 px-2">
            <div className="col-2  order-content-text">
              <p className="">Send</p>
              <p>Receive</p>
            </div>
            <div className="col-2  order-content-text">
              <p className="">{record.matchOrderContractAddress.name}</p>
              <p>{record.orderContractAddress.name}</p>
            </div>
            <div className="col-2  order-content-text">
              <p className="">{record.matchOrderTokenId}</p>
              <p>{record.orderTokenId}</p>
            </div>
            <div className="col-2  order-content-text mt-3">
              <p>{record.block}</p>
            </div>
            <div className="col-4 history-detail-text mt-3">
              <a href={`https://ropsten.etherscan.io/tx/${record.transactionHash}`} target="_blank" rel="noopener noreferrer">Check the details</a>
              <span className="ml-2 oi oi-arrow-right" />
            </div>
          </div>
        )
    ))}
  </div>
);

export default ExchangeRecordHistory;
