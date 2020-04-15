import * as types from '../constants/ActionTypes';

export default function controlUser(state = { watchHash: { hash: '', confirmation: false } }, action) {
  switch (action.type) {
    case types.EDIT_USER_ADDRESS:
      return {
        ...state,
        address: action.value,
      };
    case types.EDIT_USER_WATCH_TRANSACTION:
      return {
        ...state,
        watchHash: {
          hash: action.value,
          confirmation: false,
        },
      };
    case types.EDIT_USER_WATCH_CONFIRMATION:
      return {
        ...state,
        watchHash: {
          ...state.watchHash,
          confirmation: true,
        },
      };
    case types.EDIT_USER_NETWORK:
      return {
        ...state,
        network: action.value,
      };
    case types.EDIT_USER_WATCH_CONTRACT:
      return {
        ...state,
        watchContract: {
          address: action.address,
          name: action.name,
        },
      };
    default:
      return state;
  }
}
