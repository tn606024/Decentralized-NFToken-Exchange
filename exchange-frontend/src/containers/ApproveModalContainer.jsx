import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ApproveModal from '../components/ApproveModal';
import Erc721 from '../ethereum/erc721';
import { ExchangeAddress } from '../constants/ContractAddress';
import { editUserWatchTransaction, editUserWatchConfirmation } from '../actions/user';
import { ConfirmationNumber } from '../constants';

class ApproveModalContainer extends React.Component {
  handleApproveOnClick = () => {
    const {
      address, watchContract, openSendModal, dispatchEditUserWatchTransaction, dispatchEditUserWatchConfirmation, closeApproveModal,
    } = this.props;
    const erc721 = Erc721(watchContract.address);
    erc721.methods.setApprovalForAll(ExchangeAddress, true).send({ from: address }).on('transactionHash', (hash) => {
      closeApproveModal();
      dispatchEditUserWatchTransaction(hash);
      openSendModal();
    }).on('confirmation', (confirmationNumber, receipt) => {
      if (confirmationNumber === ConfirmationNumber) {
        dispatchEditUserWatchConfirmation();
      }
    });
  };


  render() {
    const {
      isApproveOpen, afterOpenApproveModal, closeApproveModal, openSendModal, watchContract,
    } = this.props;
    return (
      <ApproveModal
        isOpen={isApproveOpen}
        onAfterOpen={afterOpenApproveModal}
        onRequestClose={closeApproveModal}
        handleApproveOnClick={this.handleApproveOnClick}
        watchContract={watchContract}
      />
    );
  }
}

ApproveModalContainer.propTypes = {
  isApproveOpen: PropTypes.func.isRequired,
  afterOpenApproveModal: PropTypes.func.isRequired,
  closeApproveModal: PropTypes.func.isRequired,
  watchContract: PropTypes.shape({
    address: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
};

const mapDispatchToProps = dispatch => ({
  dispatchEditUserWatchTransaction: watchHash => dispatch(editUserWatchTransaction(watchHash)),
  dispatchEditUserWatchConfirmation: () => dispatch(editUserWatchConfirmation()),
});


const mapStateToProps = (state) => {
  const { address, watchHash, watchContract } = state.user;
  return {
    address,
    watchHash,
    watchContract,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ApproveModalContainer);
