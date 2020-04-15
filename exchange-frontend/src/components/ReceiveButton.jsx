import React from 'react';
import PropTypes from 'prop-types';


const ReceiveButton = ({ sendToContractOnClick }) => (
  <div>
    <button type="button" className="btn imp-button ml-2 receive-button" onClick={sendToContractOnClick}>Receive</button>
  </div>
);

ReceiveButton.propTypes = {
  sendToContractOnClick: PropTypes.func.isRequired,
};

export default ReceiveButton;
