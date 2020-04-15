import React from 'react';
import PropTypes from 'prop-types';
import TokenCard from './TokenCard';

const TokenCardGroup = ({ tokens, children, link }) => (
  <div className="card-deck mt-2 ml-2">
    {tokens.map(token => (
      <TokenCard key={token._id} token={token} link={link}>
        {children}
      </TokenCard>
    ))}
  </div>
);

TokenCardGroup.propTypes = {
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
  children: PropTypes.node.isRequired,
  link: PropTypes.bool,
};

TokenCardGroup.defaultProps = {
  link: false,
};


export default TokenCardGroup;
