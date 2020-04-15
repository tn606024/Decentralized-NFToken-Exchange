import React from 'react';
import PropTypes from 'prop-types';
import TokenCard from './TokenCard';
import TokenCardGroup from './TokenCardGroup';
import ChooseButtonContainer from '../containers/ChooseButtonContainer';
import SendModalContainer from '../containers/SendModalContainer';

const fontStyle = {
  fontSize: '2.7rem',
};

const Choose = ({
  token,
  chooseTokens,
  watchHash,
  isOpen,
  openModal,
  afterOpenModal,
  closeModal,
}) => (
  <div>
    {token !== undefined
      ? (
        <div className="container">
          <SendModalContainer
            isOpen={isOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            watchHash={watchHash}
          />
          <div className="row mt-3 justify-content-center">
            <TokenCard token={token} />
          </div>
          <div className="row mt-3 justify-content-center">
            <h2 className="change-title-text">Which NFTOKEN you want to use for CHANGE?</h2>
          </div>
          <div className="row mt-3">
            <TokenCardGroup tokens={chooseTokens}>
              <ChooseButtonContainer order={token.order} openModal={openModal} />
            </TokenCardGroup>
          </div>
        </div>
      )
      : null
    }
  </div>
);

Choose.propTypes = {
  chooseTokens: PropTypes.arrayOf(
    PropTypes.shape({
      contractAddress: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }),
      tokenId: PropTypes.number.isRequired,
      _id: PropTypes.string.isRequired,
    }),
  ).isRequired,
  token: PropTypes.shape({
    contractAddress: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
    tokenId: PropTypes.number.isRequired,
    _id: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    owner: PropTypes.string.isRequired,
    order: PropTypes.string.isRequired,
    match: PropTypes.arrayOf(
      PropTypes.shape({
        contractAddress: PropTypes.shape({
          _id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
        }),
        tokenId: PropTypes.number.isRequired,
        _id: PropTypes.string.isRequired,
      }),
    ),
    want: PropTypes.arrayOf(
      PropTypes.shape({
        contractAddress: PropTypes.shape({
          _id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
        }),
        tokenId: PropTypes.number.isRequired,
        _id: PropTypes.string.isRequired,
      }),
    ),
  }).isRequired,
  watchHash: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  openModal: PropTypes.func.isRequired,
  afterOpenModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default Choose;
