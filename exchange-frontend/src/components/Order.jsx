import React from 'react';
import PropTypes from 'prop-types';
import TokenCardGroup from './TokenCardGroup';
import OrderInfo from './OrderInfo';

const Order = ({ tokens }) => (
  <div className="row">
    <TokenCardGroup tokens={tokens} link>
      <OrderInfo />
    </TokenCardGroup>
  </div>
);

Order.propTypes = {
  tokens: PropTypes.arrayOf(
    PropTypes.shape({
      contractAddress: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }),
      tokenId: PropTypes.number.isRequired,
      _id: PropTypes.string.isRequired,
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
    }),
  ).isRequired,
};

export default Order;
