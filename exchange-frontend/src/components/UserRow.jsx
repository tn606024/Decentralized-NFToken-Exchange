import React from 'react';
import PropTypes from 'prop-types';

const addressStyle = {
  letterSpacing: '.13em',
  fontSize: '0.8em',
};

const UserRow = ({ address }) => (
  <div className="user-row ">
    <div className="container">
      <div className="row flex-column align-items-start px-5 py-3">
        <h2 className="nav-title">Hi User</h2>
        <div className="nav-text">{address}</div>
      </div>
    </div>
  </div>
);

UserRow.propTypes = {
  address: PropTypes.string,
};

UserRow.defaultProps = {
  address: '',
};

export default UserRow;
