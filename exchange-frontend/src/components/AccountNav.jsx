import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const inactiveStyle = {
  fontFamily: "\'Open Sans\', sans-serif",
  fontWeight: 'bold',
  fontStyle: 'normal',
  fontStretch: 'normal',
  lineHeight: 'normal',
  letterSpacing: '2.5px',
  color: '#2f2f2f',
};

const activeStyle = {
  display: 'block',
  borderBottom: 'solid 3px #2f2f2f',
  fontFamily: "\'Open Sans\', sans-serif",
  fontWeight: 'bold',
  fontStyle: 'normal',
  fontStretch: 'normal',
  lineHeight: 'normal',
  letterSpacing: '2.5px',
  color: '#2f2f2f',
};

const AccountNav = ({ match }) => (
  <div className="row justify-content-center mt-5 mb-4">
    <ul className="nav account-nav">
      <li className="nav-item mx-25rem">
        <NavLink to={`${match.url}/order`} style={inactiveStyle} activeStyle={activeStyle}>
          <div className="nav-link ">Order</div>
        </NavLink>
      </li>
      <li className="nav-item mx-25rem">
        <NavLink to={`${match.url}/offer`} style={inactiveStyle} activeStyle={activeStyle}>
          <div className="nav-link">Offer</div>
        </NavLink>
      </li>
      <li className="nav-item mx-25rem">
        <NavLink to={`${match.url}/incontract`} style={inactiveStyle} activeStyle={activeStyle}>
          <div className="nav-link ">In Contract</div>
        </NavLink>
      </li>
      <li className="nav-item mx-25rem">
        <NavLink to={`${match.url}/inwallet`} style={inactiveStyle} activeStyle={activeStyle}>
          <div className="nav-link ">In Wallet</div>
        </NavLink>
      </li>
    </ul>
  </div>
);

AccountNav.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};

export default AccountNav;
