import React from 'react';
import Modal from 'react-modal';
import { Spin } from 'antd';
import 'antd/dist/antd.css';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    padding: '4rem 5rem',
    borderRadius: '40px',
    transform: 'translate(-50%, -50%)',
  },
};

const letterSpacingStyle = {
  letterSpacing: '.03em',
};

const SendModal = ({
  isOpen, afterOpenModal, closeModal, watchHash, handleBackOnClick,
}) => (
  <Modal
    isOpen={isOpen}
    onAfterOpen={afterOpenModal}
    onRequestClose={closeModal}
    style={customStyles}
    contentLabel="Example Modal"
  >
    <h2 className="opensans-semi-bold mb-4 animated bounce delay-2s">Transaction have already sent</h2>
    <p className="opensans hash-hint-text" style={letterSpacingStyle}>
      Transaction hash is
    </p>
    <p className="hash-text">
      {`${watchHash.hash}`}
    </p>
    <p className="opensans mt-5">
      Click
      <a href={`https://ropsten.etherscan.io/tx/${watchHash.hash}`} className="opensans-semi-bold" target="_blank" rel="noopener noreferrer"> this link </a>
      to confirm
    </p>
    {watchHash.confirmation === true
      ? (
        <div>
          <div className="mb-4">
            <h5 className="mined-text d-inline">Successfully Mined!!</h5>
          </div>
          <div className="send-back-text" onClick={handleBackOnClick}>
            <span className="mr-2 oi oi-arrow-left" />
            Back
          </div>
        </div>
      )
      : (
        <div className="mb-4">
          <Spin />
          <p className="hash-hint-text ml-3 d-inline">Waiting for the transaction to be mined</p>
        </div>
      )
    }
  </Modal>
);

SendModal.propTypes = {
  watchHash: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  afterOpenModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default SendModal;
