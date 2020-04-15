import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import UserRowContainer from '../containers/UserRowContainer';
import AccountNav from './AccountNav';
import WallectContainer from '../containers/WalletContainer';
import InContractContainer from '../containers/InContractContainer';
import OrderContainer from '../containers/OrderContainer';
import OfferContainer from '../containers/OfferContainer';

const Account = ({ match }) => (
  <div>
    <UserRowContainer />
    <div className="container">
      <AccountNav match={match} />
      <div>
        <Switch>
          <Route path={`${match.path}/inwallet`} component={WallectContainer} />
          <Route path={`${match.path}/incontract`} component={InContractContainer} />
          <Route path={`${match.path}/order`} component={OrderContainer} />
          <Route path={`${match.path}/offer`} component={OfferContainer} />
        </Switch>
      </div>
    </div>
  </div>
);

Account.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};

export default Account;
