import React from 'react';
import PropTypes from 'prop-types';


const ChooseButton = ({ matchTokenOnClick }) => (
  <button type="button" className="btn imp-button ml-2 receive-button" onClick={matchTokenOnClick}>Match</button>
);

ChooseButton.propTypes = {
  matchTokenOnClick: PropTypes.func.isRequired,
};

export default ChooseButton;
