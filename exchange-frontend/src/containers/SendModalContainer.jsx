import React from 'react';
import SendModal from '../components/SendModal';

class SendModalContainer extends React.Component {
  handleBackOnClick = () => {
    const { onRequestClose } = this.props;
    onRequestClose();
  }

  render() {
    const {
      isOpen, onAfterOpen, onRequestClose, watchHash,
    } = this.props;
    return (
      <SendModal
        isOpen={isOpen}
        onAfterOpen={onAfterOpen}
        onRequestClose={onRequestClose}
        watchHash={watchHash}
        handleBackOnClick={this.handleBackOnClick}
      />
    );
  }
}

export default SendModalContainer;
