import React from 'react';
import { connect } from 'react-redux';
import SendHistory from '../components/SendHistory';
import { getUserSendInHistory } from '../utils/api/history';


class SendInHistoryContainer extends React.Component {
  state = {
    history: [],
  }

  async componentDidMount() {
    const { address } = this.props;
    const history = await getUserSendInHistory(address);
    console.log(history);
    this.setState({ history });
  }

  render() {
    const { history } = this.state;
    return (
      <SendHistory history={history} />
    );
  }
}

const mapStateToProps = (state) => {
  const { address } = state.user;
  return {
    address,
  };
};

export default connect(mapStateToProps)(SendInHistoryContainer);
