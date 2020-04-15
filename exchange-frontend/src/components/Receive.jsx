import React from 'react';
import PropTypes from 'prop-types';

const Receive = ({
  contractAddress,
  tokenId,
  handleInputChange,
  sendToContractOnClick,
}) => (
  <div className="row justify-content-center">
    <form className="mt-3">
      <div className="form-group">
        <div className="my-2">Contract Address</div>
        <input type="text" className="form-control" name="contractAddress" onChange={handleInputChange} value={contractAddress} />
      </div>
      <div className="form-group">
        <div className="my-2">Token Id</div>
        <input type="text" className="form-control" name="tokenId" onChange={handleInputChange} value={tokenId} />
      </div>
      <button type="submit" className="btn btn-primary" onClick={sendToContractOnClick}>Submit</button>
    </form>
  </div>
);

Receive.propTypes = {
  contractAddress: PropTypes.string,
  tokenId: PropTypes.string,
  handleInputChange: PropTypes.func.isRequired,
  sendToContractOnClick: PropTypes.func.isRequired,
};

Receive.defaultProps = {
  contractAddress: '',
  tokenId: '',
};
export default Receive;
