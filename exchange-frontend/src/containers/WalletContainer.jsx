import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Wallet from '../components/Wallet';
import { getUserWalletTokens } from '../utils/api/event';

class WalletContainer extends React.Component {
    state = {
      tokens: [],
      sync: false,
      sendModalIsOpen: false,
      approveModalIsOpen: false,
    }

    async componentDidMount() {
      const { address } = this.props;
      const tokens = await getUserWalletTokens(address);
      this.setState({ sync: true });
      this.setState({ tokens });
    }

    async componentWillReceiveProps(newProps) {
      const { address } = newProps;
      const tokens = await getUserWalletTokens(address);
      this.setState({ tokens });
    }

    openApproveModal = () => {
      this.setState({ approveModalIsOpen: true });
    }

    afterOpenApproveModal = () => {
      // references are now sync'd and can be accessed.
      // this.subtitle.style.color = '#f00';
    }

    closeApproveModal = () => {
      this.setState({ approveModalIsOpen: false });
    }

    openModal = () => {
      this.setState({ sendModalIsOpen: true });
    }

    afterOpenModal = () => {
      // references are now sync'd and can be accessed.
      // this.subtitle.style.color = '#f00';
    }

    closeModal = () => {
      this.setState({ sendModalIsOpen: false });
    }

    render() {
      const {
        tokens, sendModalIsOpen, approveModalIsOpen, sync,
      } = this.state;
      const { watchHash } = this.props;

      return (
        <Wallet
          tokens={tokens}
          openModal={this.openModal}
          afterOpenModal={this.afterOpenModal}
          closeModal={this.closeModal}
          isOpen={sendModalIsOpen}
          openApproveModal={this.openApproveModal}
          afterOpenApproveModal={this.afterOpenApproveModal}
          closeApproveModal={this.closeApproveModal}
          isApproveOpen={approveModalIsOpen}
          watchHash={watchHash}
          sync={sync}
        />
      );
    }
}

const mapStateToProps = (state) => {
  const { address, watchHash } = state.user;
  return {
    address,
    watchHash,
  };
};

WalletContainer.propTypes = {
  address: PropTypes.string.isRequired,
  watchHash: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(WalletContainer);
