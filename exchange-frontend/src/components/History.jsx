import React from 'react';
import { Route } from 'react-router-dom';
import HistoryNav from './HistoryNav';
import SendInHistoryContainer from '../containers/SendInHistoryContainer';
import SendBackHistoryContainer from '../containers/SendBackHistoryContainer';
import ExchangeRecordHistoryContainer from '../containers/ExchangeRecordHistoryContainer';
import HistoryBar from './HistoryBar';

const History = ({ match }) => (
  <div>
    <HistoryBar />
    <div className="container">
      <HistoryNav match={match} />
      <div>
        <Route path={`${match.path}/sendin`} component={SendInHistoryContainer} />
        <Route path={`${match.path}/sendback`} component={SendBackHistoryContainer} />
        <Route path={`${match.path}/exchange`} component={ExchangeRecordHistoryContainer} />
      </div>
    </div>
  </div>
);

export default History;
