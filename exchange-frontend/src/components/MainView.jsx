import React from 'react';

const MainView = ({ marketPlaceOnClick, accountOnClick }) => (
  <div className="h100 bg">
    <div className="container">
      <div className="row justify-content-center flex-column">
        <div className="mt-4rem">
          <h1 className="welcome-title d-block">Welcome to NFToken Swap</h1>
          <p className="welcome-p">A simple way to exchange erc721 tokens with others.</p>
        </div>
        <div className="mt-3">
          <button type="button" className="btn imp-button mr-5 px-3 py-2" onClick={marketPlaceOnClick}>Marketplace</button>
          <button type="button" className="btn imp-button  px-3 py-2" onClick={accountOnClick}>Account</button>
        </div>
      </div>
    </div>
  </div>
);

export default MainView;
