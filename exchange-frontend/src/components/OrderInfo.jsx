import React from 'react';
import PropTypes from 'prop-types';

const OrderInfo = ({ match }) => (
  <div className="info-text">
    <p className="d-inline mr-1 ">{match.length}</p>
    <p className="d-inline">offer</p>
  </div>
);

OrderInfo.propTypes = {
  match: PropTypes.arrayOf(
    PropTypes.shape({
      contractAddress: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }),
      tokenId: PropTypes.number.isRequired,
      _id: PropTypes.string.isRequired,
    }),
  ),
};

OrderInfo.defaultProps = {
  match: [],
};

export default OrderInfo;
