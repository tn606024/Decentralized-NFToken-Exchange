import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ChooseButton from '../components/ChooseButton';
import exchange from '../ethereum/exchange';
import { editUserWatchTransaction, editUserWatchConfirmation } from '../actions/user';
import { ConfirmationNumber } from '../constants';


class ChooseButtonContainer extends React.Component {
  matchTokenOnClick = () => {
    const {
      order,
      dispatchEditUserWatchTransaction,
      dispatchEditUserWatchConfirmation,
      contractAddress,
      tokenId,
      address,
      openModal,
    } = this.props;
    exchange.methods.createMatchOrder(contractAddress, tokenId, order).send({
      from: address,
    }).on('transactionHash', (hash) => {
      dispatchEditUserWatchTransaction(hash);
      openModal();
    }).on('confirmation', (confirmationNumber, receipt) => {
      if (confirmationNumber === ConfirmationNumber) {
        dispatchEditUserWatchConfirmation();
      }
    });
  }

  render() {
    return (
      <ChooseButton
        matchTokenOnClick={this.matchTokenOnClick}
      />
    );
  }
}

const mapStateToProps = state => ({
  address: state.user.address,
});

const mapDispatchToProps = dispatch => ({
  dispatchEditUserWatchTransaction: watchHash => dispatch(editUserWatchTransaction(watchHash)),
  dispatchEditUserWatchConfirmation: () => dispatch(editUserWatchConfirmation()),

});

ChooseButtonContainer.propTypes = {
  order: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  contractAddress: PropTypes.string.isRequired,
  tokenId: PropTypes.number.isRequired,
  dispatchEditUserWatchTransaction: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(ChooseButtonContainer);
