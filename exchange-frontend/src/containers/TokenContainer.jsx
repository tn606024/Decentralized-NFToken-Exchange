import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Token from '../components/Token';
import { getNFToken } from '../utils/api/event';
import exchange from '../ethereum/exchange';
import { editUserWatchTransaction, editUserWatchConfirmation } from '../actions/user';
import {ConfirmationNumber} from '../constants';

class TokenContainer extends React.Component {
  state = {
    token: undefined,
    sendModalIsOpen: false,
  }

  async componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    const token = await getNFToken(id);
    if (token !== null) {
      this.setState({
        token,
      });
    }
  }

  async componentWillReceiveProps(newProps) {
    const { id } = newProps.match.params;
    const token = await getNFToken(id);
    if (token !== null) {
      this.setState({
        token,
      });
    }
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

  sendBackOnClick = () => {
    const { token } = this.state;
    const {
      address,
      dispatchEditUserWatchTransaction,
      dispatchEditUserWatchConfirmation,
    } = this.props;
    const { tokenId, contractAddress } = token;
    exchange.methods.sendBackToken(contractAddress._id, tokenId).send({
      from: address,
    }).on('transactionHash', (hash) => {
      dispatchEditUserWatchTransaction(hash);
      this.openModal();
    }).on('confirmation', (confirmationNumber, receipt) => {
      if (confirmationNumber === ConfirmationNumber) {
        dispatchEditUserWatchConfirmation();
      }
    });
  }

  createOrderOnClick = async () => {
    const { token } = this.state;
    const {
      address,
      dispatchEditUserWatchTransaction,
      dispatchEditUserWatchConfirmation,
    } = this.props;
    const { tokenId, contractAddress } = token;
    exchange.methods.createOrder(contractAddress._id, tokenId).send({
      from: address,
    }).on('transactionHash', (hash) => {
      console.log(hash);
      dispatchEditUserWatchTransaction(hash);
      this.openModal();
    }).on('confirmation', (confirmationNumber, receipt) => {
      if (confirmationNumber === ConfirmationNumber) {
        dispatchEditUserWatchConfirmation();
      }
    });
  }

  deleteOrderOnClick = async () => {
    const { token } = this.state;
    const {
      address,
      dispatchEditUserWatchTransaction,
      dispatchEditUserWatchConfirmation,
    } = this.props;
    const { order } = token;
    exchange.methods.deleteOrder(order).send({
      from: address,
    }).on('transactionHash', (hash) => {
      dispatchEditUserWatchTransaction(hash);
      this.openModal();
    }).on('confirmation', (confirmationNumber, receipt) => {
      if (confirmationNumber === ConfirmationNumber) {
        dispatchEditUserWatchConfirmation();
      }
    });
  }

  deleteMatchOrderOnClick = async (e) => {
    const { token } = this.state;
    const {
      address,
      dispatchEditUserWatchTransaction,
      dispatchEditUserWatchConfirmation,
    } = this.props;
    const matchOrder = token._id;
    const order = e.target.name;
    exchange.methods.deleteMatchOrder(matchOrder, order).send({
      from: address,
    }).on('transactionHash', (hash) => {
      dispatchEditUserWatchTransaction(hash);
      this.openModal();
    }).on('confirmation', (confirmationNumber, receipt) => {
      if (confirmationNumber === ConfirmationNumber) {
        dispatchEditUserWatchConfirmation();
      }
    });
  }

  exchangeTokenOnClick = async (e) => {
    const { token } = this.state;
    const {
      address,
      dispatchEditUserWatchTransaction,
      dispatchEditUserWatchConfirmation,
    } = this.props;
    const { order } = token;
    const matchOrder = e.target.name;
    exchange.methods.exchangeToken(order, matchOrder).send({
      from: address,
    }).on('transactionHash', (hash) => {
      dispatchEditUserWatchTransaction(hash);
      this.openModal();
    }).on('confirmation', (confirmationNumber, receipt) => {
      if (confirmationNumber === ConfirmationNumber) {
        dispatchEditUserWatchConfirmation();
      }
    });
  }


  render() {
    const { token, sendModalIsOpen } = this.state;
    const { address, watchHash } = this.props;
    return (
      <Token
        token={token}
        address={address}
        sendBackOnClick={this.sendBackOnClick}
        createOrderOnClick={this.createOrderOnClick}
        deleteOrderOnClick={this.deleteOrderOnClick}
        deleteMatchOrderOnClick={this.deleteMatchOrderOnClick}
        exchangeTokenOnClick={this.exchangeTokenOnClick}
        openModal={this.openModal}
        afterOpenModal={this.afterOpenModal}
        closeModal={this.closeModal}
        isOpen={sendModalIsOpen}
        watchHash={watchHash}
      />
    );
  }
}

TokenContainer.propTypes = {
  address: PropTypes.string.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
  dispatchEditUserWatchTransaction: PropTypes.func.isRequired,
  watchHash: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { address, watchHash } = state.user;
  return {
    address,
    watchHash,
  };
};

const mapDispatchToProps = dispatch => ({
  dispatchEditUserWatchTransaction: watchHash => dispatch(editUserWatchTransaction(watchHash)),
  dispatchEditUserWatchConfirmation: () => dispatch(editUserWatchConfirmation()),
});


export default connect(mapStateToProps, mapDispatchToProps)(TokenContainer);
