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

const ApproveModal = ({
  isOpen, afterOpenModal, closeModal, handleApproveOnClick, watchContract,
}) => (
  <Modal
    isOpen={isOpen}
    onAfterOpen={afterOpenModal}
    onRequestClose={closeModal}
    style={customStyles}
    contentLabel="Example Modal"
  >
    <h2 className="opensans-semi-bold- mb-5 animated bounce delay-2s">Approve NFToken</h2>
    <p className="opensans mb-5">
      {watchContract !== undefined
        ? `You need to grant permission for Exchange to interact with ${watchContract.name}`
        : 'You need to grant permission for Exchange to interact with NFToken'
      }
    </p>
    <button type="button" className="btn imp-button mr-2" onClick={handleApproveOnClick}>Approve</button>
  </Modal>
);

ApproveModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  afterOpenModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default ApproveModal;
