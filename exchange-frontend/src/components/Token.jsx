import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';
import { Tag } from 'antd';
import SendModalContainer from '../containers/SendModalContainer';

const orderNavStyle = {
  backgroundColor: '#eafefb',
  borderRadius: '6px',
};

const Token = ({
  token,
  address,
  sendBackOnClick,
  createOrderOnClick,
  deleteOrderOnClick,
  deleteMatchOrderOnClick,
  exchangeTokenOnClick,
  afterOpenModal,
  closeModal,
  isOpen,
  watchHash,
}) => (
  token !== undefined
    ? (
      <div className="container mt-3">
        <SendModalContainer
          isOpen={isOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          watchHash={watchHash}
        />
        <div className="row mt-5 mx-4">
          <nav className="" aria-label="breadcrumb ">
            <ol className="breadcrumb" style={{ backgroundColor: '#ffffff' }}>
              <NavLink to="/account" style={{ textDecoration: 'none' }}>
                <li className="breadcrumb-item active back-text" aria-current="page">
                  <span className="mr-2 oi oi-arrow-left" />
                  Back
                </li>
              </NavLink>
            </ol>
          </nav>
        </div>
        <div className="row mb-3">
          <div className="col-4 ml-5 pl-4">
            <img className="img-fluid" src={token.info.img} alt="" />
          </div>
          <div className="col-7">
            <div className="d-flex flex-column justify-content-start align-items-start ml-5 mt-3">
              <div>
                <div className="my-1 mr-4  title-style d-inline token-text">{token.contractAddress.name}</div>
                <div className="my-1 title-style d-inline token-text">{`#${token.tokenId}`}</div>
              </div>
              <div className="mt-1 my-2 token-name ">{token.info.name}</div>
              <div className="mb-4">
                {token.info.descriptions.map(description => (
                  <Tag color="cyan" className="px-2 py-2 mr-3">{description}</Tag>
                ))}
              </div>
              <div className="ownby-text">
                Owned by
              </div>
              <div className="token-owner-text">{token.owner}</div>

              <div className="mt-5">
                {token.open === false && token.owner === address
                  ? <button type="button" className="btn imp-button mr-2" onClick={createOrderOnClick}>Order</button>
                  : null
                }
                {token.open === true && token.owner === address
                  ? <button type="button" className="btn imp-button mr-2" onClick={deleteOrderOnClick}>Cancel</button>
                  : null
                }
                {token.owner === address && token.open === false
                  ? <button type="button" className="btn change-button" onClick={sendBackOnClick}>Back</button>
                  : null
                }
                {
                  token.owner !== address && token.open === true
                    ? (
                      <Link to={`/choose/${token._id}`}>
                        <button type="button" className="btn imp-button">Match</button>
                      </Link>
                    )
                    : null
                }
              </div>
            </div>
          </div>
        </div>
        {token.match.length !== 0
          ? (
            <MatchOrders
              token={token}
              address={address}
              deleteMatchOrderOnClick={deleteMatchOrderOnClick}
              exchangeTokenOnClick={exchangeTokenOnClick}
            />
          )
          : null
        }
        {
          token.want.length !== 0
            ? (
              <WantOrders
                token={token}
                address={address}
                deleteMatchOrderOnClick={deleteMatchOrderOnClick}
              />
            )
            : null
        }
      </div>
    )
    : null
);

const MatchOrders = ({
  token,
  address,
  exchangeTokenOnClick,
}) => (
  <div className="mb-5 mx-4">
    <div className="row my-3">
      <div className="col-6">
        <h3 className="mt-3 order-title-text"> Match Orders</h3>
      </div>
    </div>
    <div className="row mb-3 py-2 px-2" style={orderNavStyle}>
      <div className="col-2">
        <div className="order-nav-text ">contract</div>
      </div>
      <div className="col-2">
        <div className="order-nav-text">tokenId</div>
      </div>
      <div className="col-5">
        <div className="order-nav-text">owner</div>
      </div>
    </div>
    {token.match.map(matchToken => (
      <div className="row py-3 pl-2">
        <div className="col-2">
          <p className="order-content-text">{matchToken.contractAddress.name}</p>
        </div>
        <div className="col-2">
          <p className="order-content-text">{matchToken.tokenId}</p>
        </div>
        <div className="col-5">
          <p className="order-content-text">{matchToken.owner}</p>
        </div>
        <div className="col-3 text-left">
          <Link to={`/token/${matchToken._id}`}>
            <button type="button" className="btn mr-2 imp-button ml-3">view</button>
          </Link>
          {token.owner === address && matchToken.open === false
            ? <button type="button" className="btn change-button" name={matchToken._id} onClick={exchangeTokenOnClick}>change</button>
            : null
          }
        </div>
      </div>
    ))}
  </div>
);

const WantOrders = ({
  token,
  address,
  deleteMatchOrderOnClick,
}) => (
  <div className="mb-5 mx-4">
    <div className="row  my-3">
      <div className="col-6">
        <h3 className="mt-3 order-title-text"> Want Orders</h3>
      </div>
    </div>
    <div className="row mb-3 py-2 pl-2" style={orderNavStyle}>
      <div className="col-2">
        <div className="order-nav-text ">contract</div>
      </div>
      <div className="col-2">
        <div className="order-nav-text">tokenId</div>
      </div>
      <div className="col-5">
        <div className="order-nav-text">owner</div>
      </div>
    </div>
    {token.want.map(wantToken => (
      <div className="row py-3 pl-2">
        <div className="col-2">
          <p className="order-content-text">{wantToken.contractAddress.name}</p>
        </div>
        <div className="col-2">
          <p className="order-content-text">{wantToken.tokenId}</p>
        </div>
        <div className="col-5">
          <p className="order-content-text">{wantToken.owner}</p>
        </div>
        <div className="col-3 text-left">
          <Link to={`/token/${wantToken._id}`}>
            <button type="button" className="btn mr-2 imp-button ml-3">view</button>
          </Link>
          {token.owner === address
            ? <button type="button" className="btn change-button " name={wantToken.order} onClick={deleteMatchOrderOnClick}>cancel</button>
            : null
            }
        </div>
      </div>
    ))}
  </div>
);


MatchOrders.propTypes = {
  token: PropTypes.shape({
    contractAddress: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
    tokenId: PropTypes.number.isRequired,
    _id: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    owner: PropTypes.string.isRequired,
    order: PropTypes.string.isRequired,
    match: PropTypes.arrayOf(
      PropTypes.shape({
        contractAddress: PropTypes.shape({
          _id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
        }),
        tokenId: PropTypes.number.isRequired,
        _id: PropTypes.string.isRequired,
      }),
    ),
    want: PropTypes.arrayOf(
      PropTypes.shape({
        contractAddress: PropTypes.shape({
          _id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
        }),
        tokenId: PropTypes.number.isRequired,
        _id: PropTypes.string.isRequired,
      }),
    ),
  }).isRequired,
  address: PropTypes.string.isRequired,
  exchangeTokenOnClick: PropTypes.func.isRequired,
};

WantOrders.propTypes = {
  token: PropTypes.shape({
    contractAddress: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
    tokenId: PropTypes.number.isRequired,
    _id: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    owner: PropTypes.string.isRequired,
    order: PropTypes.string.isRequired,
    match: PropTypes.arrayOf(
      PropTypes.shape({
        contractAddress: PropTypes.shape({
          _id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
        }),
        tokenId: PropTypes.number.isRequired,
        _id: PropTypes.string.isRequired,
      }),
    ),
    want: PropTypes.arrayOf(
      PropTypes.shape({
        contractAddress: PropTypes.shape({
          _id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
        }),
        tokenId: PropTypes.number.isRequired,
        _id: PropTypes.string.isRequired,
      }),
    ),
  }).isRequired,
  deleteMatchOrderOnClick: PropTypes.func.isRequired,
  address: PropTypes.string.isRequired,
};


Token.propTypes = {
  token: PropTypes.shape({
    contractAddress: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
    tokenId: PropTypes.number.isRequired,
    _id: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    owner: PropTypes.string.isRequired,
    order: PropTypes.string.isRequired,
    match: PropTypes.arrayOf(
      PropTypes.shape({
        contractAddress: PropTypes.shape({
          _id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
        }),
        tokenId: PropTypes.number.isRequired,
        _id: PropTypes.string.isRequired,
      }),
    ),
    want: PropTypes.arrayOf(
      PropTypes.shape({
        contractAddress: PropTypes.shape({
          _id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
        }),
        tokenId: PropTypes.number.isRequired,
        _id: PropTypes.string.isRequired,
      }),
    ),
  }).isRequired,
  address: PropTypes.string.isRequired,
  sendBackOnClick: PropTypes.func.isRequired,
  createOrderOnClick: PropTypes.func.isRequired,
  deleteOrderOnClick: PropTypes.func.isRequired,
  deleteMatchOrderOnClick: PropTypes.func.isRequired,
  exchangeTokenOnClick: PropTypes.func.isRequired,
  afterOpenModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  watchHash: PropTypes.string.isRequired,
};

export default Token;
