import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import MarketPlace from '../components/MarketPlace';
import { getOpenOrders, getOpenOrdersWithSearch } from '../utils/api/event';
import { SORT_SELECT_ENUM, BASE_SELECT_ENUM } from '../constants/Enum';

const sortTokens = (tokens, baseSelect, sortSelect) => {
  if (baseSelect === BASE_SELECT_ENUM.ORDERS) {
    if (sortSelect === SORT_SELECT_ENUM.HIGHTOLOW) {
      tokens.sort((a, b) => b.match.length - a.match.length);
    } else {
      tokens.sort((a, b) => a.match.length - b.match.length);
    }
  }
  return tokens;
};

const getOrdersWithSelect = async (address, baseSelect, sortSelect) => {
  let tokens = await getOpenOrders(address);
  tokens = sortTokens(tokens, baseSelect, sortSelect);
  return tokens;
};

class MarketPlaceContainer extends React.Component {
  state = {
    tokens: [],
    search: '',
    baseSelect: BASE_SELECT_ENUM.ORDERS,
    sortSelect: SORT_SELECT_ENUM.HIGHTOLOW,
  }

  async componentDidMount() {
    const { address } = this.props;
    const { baseSelect, sortSelect } = this.state;
    const tokens = await getOrdersWithSelect(address, baseSelect, sortSelect);
    this.setState({
      tokens,
    });
  }


  async componentWillReceiveProps(newProps, prevState) {
    const { address, location } = newProps;
    const { baseSelect, sortSelect } = this.state;
    if (location.search !== '') {
      const params = new URLSearchParams(location.search);
      const search = params.get('search');
      let tokens = await getOpenOrdersWithSearch(address, search);
      tokens = sortTokens(tokens, baseSelect, sortSelect);
      this.setState({
        tokens,
      });
    } else {
      const tokens = await getOrdersWithSelect(address, baseSelect, sortSelect);
      this.setState({
        tokens,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    let { baseSelect, sortSelect, tokens } = this.state;
    if (prevState.baseSelect !== baseSelect || prevState.sortSelect !== sortSelect) {
      tokens = sortTokens(tokens, baseSelect, sortSelect);
      this.setState({
        tokens,
      });
    }
  }

  handleOnChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleOnSearchKeyPress = (e) => {
    const { value } = e.target;
    const { history } = this.props;
    if (e.key === 'Enter') {
      history.push(`/marketplace?search=${value}`);
      // this.setState({
      //   [name]: value,
      // });
    }
  }

  handleOnSearchKeyClick = (e) => {
    e.preventDefault();
    const { search } = this.state;
    const { history } = this.props;
    history.push(`/marketplace?search=${search}`);
  }

  handleBaseSelectOnChange = (value) => {
    this.setState({
      baseSelect: value,
    });
  }

  handleSortSelectOnChange = (value) => {
    this.setState({
      sortSelect: value,
    });
  }


  render() {
    const { tokens, search } = this.state;
    const { address } = this.props;
    return (
      <MarketPlace
        tokens={tokens}
        address={address}
        search={search}
        handleOnSearchKeyPress={this.handleOnSearchKeyPress}
        handleBaseSelectOnChange={this.handleBaseSelectOnChange}
        handleSortSelectOnChange={this.handleSortSelectOnChange}
        handleOnSearchKeyClick={this.handleOnSearchKeyClick}
        handleOnChange={this.handleOnChange}
      />
    );
  }
}


const mapStateToProps = state => ({
  address: state.user.address,
});

MarketPlaceContainer.propTypes = {
  address: PropTypes.string.isRequired,
};

export default withRouter(connect(mapStateToProps)(MarketPlaceContainer));
