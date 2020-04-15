import React from 'react';
import { connect } from 'react-redux';
import ExchangeRecordHistory from '../components/ExchangeRecordHistory';
import { getUserExchangeHistory } from '../utils/api/history';


class ExchangeRecordHistoryContainer extends React.Component {
    state = {
      history: [],
    }

    async componentDidMount() {
      const { address } = this.props;
      const history = await getUserExchangeHistory(address);
      console.log(history);
      this.setState({ history });
    }

    render() {
      const { history } = this.state;
      const { address } = this.props;
      return (
        <ExchangeRecordHistory history={history} address={address} />
      );
    }
}

const mapStateToProps = (state) => {
  const { address } = state.user;
  return {
    address,
  };
};

export default connect(mapStateToProps)(ExchangeRecordHistoryContainer);
