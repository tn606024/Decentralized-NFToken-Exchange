import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Erc721 from '../ethereum/erc721';
import exchange from '../ethereum/exchange';
import ReceiveButton from '../components/ReceiveButton';
import { ExchangeAddress } from '../constants/ContractAddress';
import { editUserWatchTransaction, editUserWatchContract, editUserWatchConfirmation } from '../actions/user';
import { ConfirmationNumber } from '../constants';
class ReceiveButtonContainer extends React.Component {
    sendToContractOnClick = async (e) => {
      e.preventDefault();
      const {
        dispatchEditUserWatchTransaction,
        dispatchEditUserWatchConfirmation,
        dispatchEditUserWatchContract,
        contractAddress,
        contractName,
        tokenId,
        address,
        openModal,
        openApproveModal,
        closeApproveModal,
      } = this.props;
      const erc721 = Erc721(contractAddress);
      const approved = await erc721.methods.isApprovedForAll(address, ExchangeAddress).call();
      if (approved !== true) {
        dispatchEditUserWatchContract(contractAddress, contractName);
        openApproveModal();
        // erc721.methods.setApprovalForAll(ExchangeAddress, true).send({ from: address }).on('transactionHash', (hash) => {
        //   // dispatchEditUserWatchTransaction(hash);
        //   // openModal();
        //   exchange.methods.receiveErc721Token(contractAddress, tokenId).send({ from: address }).on('transactionHash', (hash) => {
        //     dispatchEditUserWatchTransaction(hash);
        //     openModal();
        //   });
        // });
      } else {
        exchange.methods.receiveErc721Token(contractAddress, tokenId).send({ from: address }).on('transactionHash', (hash) => {
          dispatchEditUserWatchTransaction(hash);
          openModal();
        }).on('confirmation', (confirmationNumber, receipt) => {
          if (confirmationNumber === ConfirmationNumber) {
            dispatchEditUserWatchConfirmation();
          }
        });
      }
    }

    render() {
      return (
        <ReceiveButton
          sendToContractOnClick={this.sendToContractOnClick}
        />
      );
    }
}
const mapStateToProps = state => ({
  address: state.user.address,
});

const mapDispatchToProps = dispatch => ({
  dispatchEditUserWatchTransaction: watchHash => dispatch(editUserWatchTransaction(watchHash)),
  dispatchEditUserWatchContract: (address, name) => dispatch(editUserWatchContract(address, name)),
  dispatchEditUserWatchConfirmation: () => dispatch(editUserWatchConfirmation()),

});


export default connect(mapStateToProps, mapDispatchToProps)(ReceiveButtonContainer);
