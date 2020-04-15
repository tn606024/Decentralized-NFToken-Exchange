import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import TokenCardGroup from './TokenCardGroup';
import OrderInfo from './OrderInfo';
import { SORT_SELECT_ENUM, BASE_SELECT_ENUM } from '../constants/Enum';


const { Option } = Select;

const MarketPlace = ({
  tokens,
  handleOnSearchKeyPress,
  handleBaseSelectOnChange,
  handleSortSelectOnChange,
  handleOnSearchKeyClick,
  handleOnChange,
}) => (
  <div>
    <div className="marketplace-nav">
      <div className="container py-3">
        <div className="row">
          <div className="col-3">
            <div className="d-flex flex-column align-items-start pl-4">
              <h2 className="nav-title d-block">Marketplace</h2>
              <div className="nav-text">Welcome!</div>
            </div>
          </div>
          <div className="col-7 d-flex align-items-center">
            <input
              className="form-control  marketplace-input"
              type="search"
              placeholder="Search something..."
              aria-label="Search"
              name="search"
              onKeyPress={handleOnSearchKeyPress}
              onChange={handleOnChange}
            />
          </div>
          <div className="col-2 d-flex align-items-center">
            <div className="show-hand d-block go-button pl-2" onClick={handleOnSearchKeyClick}>
              <div>
                <span className="mr-2 go-text">Go</span>
                <span className="oi oi-arrow-right" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="container">
      <div className="row mt-3 ">
        <div className="col-12">
          <div className="d-flex mt-3 justify-content-between">
            <p className="nftoken-length-text pl-4">{`${tokens.length} NFToken`}</p>
            <div className="pr-5 mr-3">
              <Select className="select-text" defaultValue="orders" style={{ width: 100, marginRight: '.5rem', fontSize: '12px' }} onChange={handleBaseSelectOnChange}>
                <Option className="select-text" value={BASE_SELECT_ENUM.ORDERS}>Orders</Option>
              </Select>
              <Select className="select-text" defaultValue="High to Low" style={{ width: 130, fontSize: '12px' }} onChange={handleSortSelectOnChange}>
                <Option className="select-text" value={SORT_SELECT_ENUM.HIGHTOLOW}>High to Low</Option>
                <Option className="select-text" value={SORT_SELECT_ENUM.LOWTOHIGH}>Low to High</Option>
              </Select>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <TokenCardGroup tokens={tokens} link>
          <OrderInfo />
        </TokenCardGroup>
      </div>
    </div>
  </div>
);

MarketPlace.propTypes = {
  tokens: PropTypes.arrayOf(
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


export default MarketPlace;
