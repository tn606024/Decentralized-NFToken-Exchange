import React from 'react';
import { connect } from 'react-redux';
import SendHistory from '../components/SendHistory';
import { getUserSendBackHistory } from '../utils/api/history';


class SendOutHistoryContainer extends React.Component {
  state = {
    history: [],
  }

  async componentDidMount() {
    const { address } = this.props;
    const history = await getUserSendBackHistory(address);
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

export default connect(mapStateToProps)(SendOutHistoryContainer);
