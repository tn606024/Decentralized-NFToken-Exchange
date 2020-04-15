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

const HistoryNav = ({ match }) => (
  <div className="row justify-content-center mt-5 mb-4">
    <ul className="nav">
      <li className="nav-item mx-4rem">
        <NavLink to={`${match.url}/sendin`} style={inactiveStyle} activeStyle={activeStyle}>
          <div className="nav-link">Send In</div>
        </NavLink>
      </li>
      <li className="nav-item mx-4rem">
        <NavLink to={`${match.url}/sendback`} style={inactiveStyle} activeStyle={activeStyle}>
          <div className="nav-link ">Send Back</div>
        </NavLink>
      </li>
      <li className="nav-item mx-4rem">
        <NavLink to={`${match.url}/exchange`} style={inactiveStyle} activeStyle={activeStyle}>
          <div className="nav-link ">Exchange Record</div>
        </NavLink>
      </li>
    </ul>
  </div>
);

HistoryNav.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};

export default HistoryNav;
