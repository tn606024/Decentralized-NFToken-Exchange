import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const cardStyle = {
  width: '15rem',
  borderRadius: '5%',
  boxShadow: 'rgba(0, 0, 0, 0.10) 0px 1px 0px 0px, rgba(0, 0, 0, 0.01) 0px 1px 1px 0px, rgba(0, 0, 0, 0.05) 0px 1px 0px -1px',
  borderColor: '#ececec',
};

const imgStyle = {
  height: 'auto',
  width: '80%',
  margin: 'auto',
};

const linkStyle = {
  color: 'rgba(24, 90, 246, 1.0)',
  textDecoration: 'none',
};

const renderChildren = (children, token) => React.Children.map(children, child => React.cloneElement(child, {
  tokenId: token.tokenId,
  contractAddress: token.contractAddress._id,
  contractName: token.contractAddress.name,
  _id: token._id,
  match: token.match,
  want: token.want,
}));


const TokenCard = ({ token, children, link }) => (
  link !== false
    ? (
      <NavLink style={linkStyle} to={`/token/${token._id}`}>
        <div className="card my-4 " style={cardStyle}>
          <img className="card-img-top px-2 py-2" style={imgStyle} src={token.info.img} alt="" />
          <div className="card-body">
            <div className="d-flex justify-content-center">
              <div>
                <p className="card-text d-inline mr-2 opensans-semi-bold token-link">{`${token.contractAddress.name} #${token.tokenId}`}</p>
              </div>
            </div>
            <div className="d-flex justify-content-center">
              {renderChildren(children, token)}
            </div>
          </div>
        </div>
      </NavLink>
    )
    : (
      <div>
        <div className="card my-4 " style={cardStyle}>
          <img className="card-img-top px-2 py-2 " style={imgStyle} src={token.info.img} alt="" />
          <div className="card-body">
            <div className="d-flex justify-content-center">
              <div className="pb-2" style={{ color: '#666666' }}>
                <p className="card-text d-inline mr-2 opensans-semi-bold ">{`${token.contractAddress.name} #${token.tokenId}`}</p>
              </div>
            </div>
            <div className="d-flex justify-content-center">
              {renderChildren(children, token)}
            </div>
          </div>
        </div>
      </div>
    )
);

TokenCard.propTypes = {
  token: PropTypes.shape({
    contractAddress: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
    tokenId: PropTypes.number.isRequired,
    _id: PropTypes.string.isRequired,
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
  children: PropTypes.node.isRequired,
  link: PropTypes.bool,
};

TokenCard.defaultProps = {
  link: false,
};


export default TokenCard;
