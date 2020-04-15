import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Order from '../components/Order';
import { getUserOrders } from '../utils/api/event';

class OrderContainer extends React.Component {
  state = {
    tokens: [],
  }

  async componentDidMount() {
    const { address } = this.props;
    const tokens = await getUserOrders(address);
    this.setState({ tokens });
  }

  async componentWillReceiveProps(newProps) {
    const { address } = newProps;
    const tokens = await getUserOrders(address);
    this.setState({ tokens });
  }

  render() {
    const { tokens } = this.state;
    const { match } = this.props;
    return (
      <Order
        tokens={tokens}
        match={match}
      />
    );
  }
}

OrderContainer.propTypes = {
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

OrderContainer.defaultProps = {
  address: '',
};

const mapStateToProps = state => ({
  address: state.user.address,
});

export default connect(mapStateToProps)(OrderContainer);
