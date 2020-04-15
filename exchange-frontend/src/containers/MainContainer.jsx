import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Main from '../components/Main';
import web3 from '../ethereum/web3';
import { editUserAddress, editUserNetwork } from '../actions/user';
import { fetchContractInfos } from '../actions/contract';


class MainContainer extends React.Component {
  state = {
    networkWarnModalIsOpen: false,
  }

  async componentDidMount() {
    const { dispatchEditUserAddress, dispatchFetchContractInfos, dispatchEditUseNetwork } = this.props;
    window.ethereum.on('accountsChanged', async () => {
      await window.ethereum.enable();
      const accounts = await web3.eth.getAccounts();
      dispatchEditUserAddress(accounts[0]);
    });
    await window.ethereum.enable();
    const accounts = await web3.eth.getAccounts();
    const network = await web3.eth.net.getNetworkType();
    switch (process.env.REACT_APP_NODE_ENV) {
      case 'ganache':
        if (network !== 'private') {
          this.openModal();
        }
        break;
      case 'ropsten':
        if (network !== 'ropsten') {
          this.openModal();
        }
        break;
      default:
        break;
    }
    dispatchEditUserAddress(accounts[0]);
    dispatchEditUseNetwork(network);
    await dispatchFetchContractInfos();
  }

  openModal = () => {
    this.setState({ networkWarnModalIsOpen: true });
  }

  afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00';
  }

  closeModal = () => {
    this.setState({ networkWarnModalIsOpen: false });
  }

  render() {
    const { address, network } = this.props;
    const { networkWarnModalIsOpen } = this.state;

    return (
      <Main
        address={address}
        network={network}
        afterOpenModal={this.afterOpenModal}
        closeModal={this.closeModal}
        isOpen={networkWarnModalIsOpen}
      />
    );
  }
}

const mapStateToProps = state => ({
  address: state.user.address,
  network: state.user.network,
});

const mapDispatchToProps = dispatch => ({
  dispatchEditUserAddress: addr => dispatch(editUserAddress(addr)),
  dispatchEditUseNetwork: network => dispatch(editUserNetwork(network)),
  dispatchFetchContractInfos: () => dispatch(fetchContractInfos()),
});

MainContainer.propTypes = {
  dispatchEditUserAddress: PropTypes.func.isRequired,
  dispatchEditUseNetwork: PropTypes.func.isRequired,
  dispatchFetchContractInfos: PropTypes.func.isRequired,
  address: PropTypes.string.isRequired,
  network: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
