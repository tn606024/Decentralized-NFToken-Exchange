import React from 'react';
import PropTypes from 'prop-types';
import TokenCardGroup from './TokenCardGroup';
import OfferInfo from './OfferInfo';

const Offer = ({ tokens }) => (
  <div className="row">
    <TokenCardGroup tokens={tokens} link>
      <OfferInfo />
    </TokenCardGroup>
  </div>
);

Offer.propTypes = {
  tokens: PropTypes.arrayOf(
    PropTypes.shape({
      contractAddress: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }),
      tokenId: PropTypes.number.isRequired,
      _id: PropTypes.string.isRequired,
      want: PropTypes.arrayOf(
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

export default Offer;
