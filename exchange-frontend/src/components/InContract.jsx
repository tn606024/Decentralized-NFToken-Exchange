import React from 'react';
import PropTypes from 'prop-types';
import TokenCardGroup from './TokenCardGroup';

const InContract = ({ tokens }) => (
  <div className="row">
    <TokenCardGroup tokens={tokens} link />
  </div>
);

InContract.propTypes = {
  tokens: PropTypes.arrayOf(
    PropTypes.shape({
      contractAddress: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }),
      tokenId: PropTypes.number.isRequired,
      _id: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

// InContract.defaultProps = {
//   tokens: [],
// };


export default InContract;
