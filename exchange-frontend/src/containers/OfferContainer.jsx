import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Offer from '../components/Offer';
import { getUserMatchOrders } from '../utils/api/event';

class OfferContainer extends React.Component {
  state = {
    tokens: [],
  }

  async componentDidMount() {
    const { address } = this.props;
    const tokens = await getUserMatchOrders(address);
    this.setState({ tokens });
  }

  async componentWillReceiveProps(newProps) {
    const { address } = newProps;
    const tokens = await getUserMatchOrders(address);
    this.setState({ tokens });
  }

  render() {
    const { tokens } = this.state;
    const { match } = this.props;
    return (
      <Offer
        tokens={tokens}
        match={match}

      />
    );
  }
}

OfferContainer.propTypes = {
  address: PropTypes.string,
  match: PropTypes.arrayOf(
    PropTypes.shape({
      contractAddress: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }),
      tokenId: PropTypes.number.isRequired,
      _id: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

OfferContainer.defaultProps = {
  address: '',
};

const mapStateToProps = state => ({
  address: state.user.address,
});

export default connect(mapStateToProps)(OfferContainer);
