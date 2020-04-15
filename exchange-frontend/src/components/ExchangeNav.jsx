import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import 'react-dropdown/style.css';
import logo from '../resource/swap_logo.png';

const ExchangeNavStyle = {
  backgroundColor: '#ffffff',
  boxShadow: '0 2px 15px 0 rgba(219, 219, 219, 0.5)',

};

const ExchangeStyle = {
  fontSize: '1.5rem',
  color: '#2ffdff',
};

const textColor = {
  color: '#A4A4A4',
};

const logoStyle = {
  marginLeft: '5rem',
};


class ExchangeNav extends React.Component {
  state = {
    popupVisible: false,
  };

  handleClick = () => {
    const { popupVisible } = this.state;
    if (!popupVisible) {
      // attach/remove event handler
      document.addEventListener('click', this.handleOutsideClick, false);
    } else {
      document.removeEventListener('click', this.handleOutsideClick, false);
    }

    this.setState(prevState => ({
      popupVisible: !prevState.popupVisible,
    }));
  }

  handleImgClick = () => {
    const { history } = this.props;
    history.push('/');
  }

  navlinkColor = () => {
    const { popupVisible } = this.state;
    const { location } = this.props;
    if (popupVisible || location.pathname.includes('/account') || location.pathname.includes('/history')) {
      return '#FF3E75';
    }
    return '#9a9a9a';
  }

  handleOutsideClick = () => {
    // ignore clicks on the component itself
    // if (this.node.contains(e.target)) {
    //   return;
    // }
    this.handleClick();
  }
  // use withRouter
  // handleRouteClick = () => {
  //   const { history } = this.props;
  //   history.push('/account');
  //   this.setState(prevState => ({
  //     popupVisible: !prevState.popupVisible,
  //   }));
  // }

  render() {
    const { address } = this.props;
    const { popupVisible } = this.state;
    return (
      <nav className="d-flex justify-content-between align-items-center py-3" style={ExchangeNavStyle}>
        <img src={logo} width="9%" alts="Logo" className="mb-2 ml-5rem show-hand" onClick={this.handleImgClick}/>
        <div>
          <div className="mr-5rem">
            <NavLink
              to="/marketplace"
              activeStyle={{ color: '#FF3E75' }}
              style={{ textDecoration: 'none', color: '#9a9a9a' }}
            >
              <div className="mx-4 d-inline open-sans">MarketPlace</div>
            </NavLink>
            <div className="dropdown" ref={(node) => { this.node = node; }}>
              <div className="ml-4 d-inline show-hand header-text" style={{ color: this.navlinkColor() }} onClick={this.handleClick}>Account</div>
              { popupVisible
                && (
                <div className="dropdown-content mt-1">
                  <NavLink
                    to="/account"
                    style={{ textDecoration: 'none', color: '#ff3e75' }}
                  >
                    <div className="py-3 bottem-line-grey">User</div>
                  </NavLink>
                  <NavLink
                    to="/history"
                    style={{ textDecoration: 'none', color: '#ff3e75' }}
                  >
                    <div className="py-3 bottem-line-grey">History</div>
                  </NavLink>
                </div>
                )
              }
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

ExchangeNav.propTypes = {
  address: PropTypes.string,
};

ExchangeNav.defaultProps = {
  address: '',
};

export default withRouter(ExchangeNav);
