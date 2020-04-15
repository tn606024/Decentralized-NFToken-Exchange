import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ExchangeNav from './ExchangeNav';
import Account from './Account';
import TokenContainer from '../containers/TokenContainer';
import ChooseContainer from '../containers/ChooseContainer';
import MarketPlaceContainer from '../containers/MarketPlaceContainer';
import HistoryContainer from '../containers/HistoryContainer';
import NetworkWarnModal from './NetworkWarnModal';
import MainViewContainer from '../containers/MainViewContainer';

const Main = ({
  address, isOpen, afterOpenModal, closeModal,
}) => (
  <Router>
    <div className="h100">
      <NetworkWarnModal
        isOpen={isOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
      />
      <ExchangeNav address={address} />
      <Route exact path="/" component={MainViewContainer} />
      <Route path="/account" component={Account} />
      <Route path="/marketplace" component={MarketPlaceContainer} />
      <Route path="/history" component={HistoryContainer} />
      <Route path="/token/:id" component={TokenContainer} />
      <Route path="/choose/:id" component={ChooseContainer} />
    </div>
  </Router>
);

Main.propTypes = {
  address: PropTypes.string,
};

Main.defaultProps = {
  address: '',
};


export default Main;
