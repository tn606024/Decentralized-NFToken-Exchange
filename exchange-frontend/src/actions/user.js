import * as types from '../constants/ActionTypes';

export const editUserAddress = value => ({
  type: types.EDIT_USER_ADDRESS,
  value,
});

export const editUserNetwork = value => ({
  type: types.EDIT_USER_NETWORK,
  value,
});

export const editUserWatchTransaction = value => ({
  type: types.EDIT_USER_WATCH_TRANSACTION,
  value,
});

export const editUserWatchConfirmation = () => ({
  type: types.EDIT_USER_WATCH_CONFIRMATION,
});

export const editUserWatchContract = (address, name) => ({
  type: types.EDIT_USER_WATCH_CONTRACT,
  address,
  name,
});
