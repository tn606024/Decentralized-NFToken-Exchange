import React from 'react';
import { withRouter } from 'react-router-dom';
import MainView from '../components/MainView';

class MainViewContainer extends React.Component {
    marketPlaceOnClick = (e) => {
      e.preventDefault();
      const { history } = this.props;
      history.push('/marketplace');
    }

    accountOnClick = (e) => {
      e.preventDefault();
      const { history } = this.props;
      history.push('/account');
    }

    render() {
      return (
        <MainView
          marketPlaceOnClick={this.marketPlaceOnClick}
          accountOnClick={this.accountOnClick}
        />
      );
    }
}

export default withRouter(MainViewContainer);
