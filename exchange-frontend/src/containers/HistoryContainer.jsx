import React from 'react';
import History from '../components/History';

class HistoryContainer extends React.Component {
  render() {
    const { match } = this.props;
    return (
      <History
            match={match}
          />
    );
  }
}

export default HistoryContainer;
