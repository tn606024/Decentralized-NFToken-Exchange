import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Choose from '../components/Choose';
import { getNFToken, getChooseTokens } from '../utils/api/event';

class ChooseContainer extends React.Component {
  state = {
    token: undefined,
    chooseTokens: [],
    sendModalIsOpen: false,
  }

  async componentDidMount() {
    const { address, match } = this.props;
    const { id } = match.params;
    const token = await getNFToken(id);
    const chooseTokens = await getChooseTokens(address, token.order);
    this.setState({
      token,
      chooseTokens,
    });
  }

  async componentWillReceiveProps(newProps) {
    const { address, match } = newProps;
    const { id } = match.params;
    const token = await getNFToken(id);
    const chooseTokens = await getChooseTokens(address, token.order);
    this.setState({
      token,
      chooseTokens,
    });
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

  render() {
    const { token, chooseTokens, sendModalIsOpen } = this.state;
    const { address, watchHash } = this.props;
    return (
      <Choose
        token={token}
        chooseTokens={chooseTokens}
        address={address}
        watchHash={watchHash}
        openModal={this.openModal}
        afterOpenModal={this.afterOpenModal}
        closeModal={this.closeModal}
        isOpen={sendModalIsOpen}
      />
    );
  }
}

ChooseContainer.propTypes = {
  address: PropTypes.string.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
  watchHash: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  address: state.user.address,
  watchHash: state.user.watchHash,
});

export default connect(mapStateToProps)(ChooseContainer);
