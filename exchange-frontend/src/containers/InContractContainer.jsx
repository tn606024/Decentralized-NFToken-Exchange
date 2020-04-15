import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import InContract from '../components/InContract';
import { getUserNFTTokens } from '../utils/api/event';


class InContractContainer extends React.Component {
  state = {
    tokens: [],
  }

  async componentDidMount() {
    const { address } = this.props;
    const tokens = await getUserNFTTokens(address);
    console.log(tokens);
    this.setState({ tokens });
  }

  async componentWillReceiveProps(newProps) {
    const { address } = newProps;
    const tokens = await getUserNFTTokens(address);
    this.setState({ tokens });
  }


  render() {
    const { tokens, match } = this.state;
    return (
      <InContract
        tokens={tokens}
        match={match}
      />
    );
  }
}

InContractContainer.propTypes = {
  address: PropTypes.string,
};

InContractContainer.defaultProps = {
  address: '',
};

const mapStateToProps = state => ({
  address: state.user.address,
});


export default connect(mapStateToProps)(InContractContainer);
