import React from 'react';
import PropTypes from 'prop-types';

const OfferInfo = ({ want }) => (
  <div className="info-text">
    <p className="card-text d-inline mr-1 montserrat">{want.length}</p>
    <p className="card-text d-inline montserrat">wait</p>
  </div>
);

OfferInfo.propTypes = {
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
};

OfferInfo.defaultProps = {
  want: [],
};

export default OfferInfo;
