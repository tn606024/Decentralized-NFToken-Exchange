import React from 'react';
import PropTypes from 'prop-types';
import TokenCardGroup from './TokenCardGroup';
import ReceiveButtonContainer from '../containers/ReceiveButtonContainer';
import SendModalContainer from '../containers/SendModalContainer';
import { TokenFaucetUrl } from '../constants/Url';
import ApproveModalContainer from '../containers/ApproveModalContainer';
import freeTokenScene from '../resource/freeTokenScene.png';

const Wallet = ({
  tokens,
  openModal,
  afterOpenModal,
  closeModal,
  isOpen,
  openApproveModal,
  afterOpenApproveModal,
  closeApproveModal,
  isApproveOpen,
  watchHash,
  sync,
}) => (
  <div>
    <SendModalContainer
      isOpen={isOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      watchHash={watchHash}
    />
    <ApproveModalContainer
      isApproveOpen={isApproveOpen}
      afterOpenApproveModal={afterOpenApproveModal}
      closeApproveModal={closeApproveModal}
      openSendModal={openModal}
    />
    {tokens.length === 0 && sync === true
      ? (
        <div>
        <div className="row flex-column align-items-center justify-content-center">
          <div>
            <h2 className="free-token-title-text my-5">{'Let\'s Get Free NFToken'}</h2>
            <div>
              <a className="btn faucet-button mb-4" href={TokenFaucetUrl} target="_blank" rel="noopener noreferrer">
                Faucet
                <span className="ml-2 oi oi-arrow-right" />
              </a>
            </div>
            <img className="img-fluid" src={freeTokenScene} alt="" />
          </div>
        </div>
        </div>
      )
      : (
        <div className="row ">
          <TokenCardGroup tokens={tokens}>
            <ReceiveButtonContainer openModal={openModal} openApproveModal={openApproveModal} closeApproveModal={closeApproveModal} />
          </TokenCardGroup>
        </div>
      )}
  </div>
);

Wallet.propTypes = {
  tokens: PropTypes.arrayOf(
    PropTypes.shape({
      contractAddress: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }),
      tokenId: PropTypes.number.isRequired,
      _id: PropTypes.string.isRequired,
    }),
  ).isRequired,
  isOpen: PropTypes.bool.isRequired,
  openModal: PropTypes.func.isRequired,
  afterOpenModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  openApproveModal: PropTypes.func.isRequired,
  afterOpenApproveModal: PropTypes.func.isRequired,
  closeApproveModal: PropTypes.func.isRequired,
  isApproveOpen: PropTypes.bool.isRequired,
  watchHash: PropTypes.string.isRequired,
  sync: PropTypes.bool.isRequired,
};

export default Wallet;
