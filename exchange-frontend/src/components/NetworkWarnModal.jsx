import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

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

const NetworkWarnModal = ({
  isOpen, afterOpenModal, closeModal,
}) => (
  <Modal
    isOpen={isOpen}
    onAfterOpen={afterOpenModal}
    onRequestClose={closeModal}
    style={customStyles}
    contentLabel="Example Modal"
  >
    <h2 className="opensans-semi-bold mb-5 animated bounce delay-2s">Network Uncorrect</h2>
    <p className="opensans">
        To access Exchange, please switch to the Ropsten Network.
    </p>
  </Modal>
);

NetworkWarnModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  afterOpenModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default NetworkWarnModal;
