import React from 'react';
import PropTypes from 'prop-types';

const InContractButtonGroup = ({ sendBackOnClick }) => (
  <div>
    <button type="button" className="btn btn-info mr-2">Order</button>
    <button type="button" className="btn btn-info" onClick={sendBackOnClick}>Back</button>
  </div>
);

InContractButtonGroup.propTypes = {
  sendBackOnClick: PropTypes.func.isRequired,
};

export default InContractButtonGroup;
