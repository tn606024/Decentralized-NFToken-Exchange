import * as types from '../constants/ActionTypes';

export default function controlContract(state = { infos: [] }, action) {
  switch (action.type) {
    case types.EDIT_CONTRACT_INFOS:
      return {
        ...state,
        infos: action.value,
      };
    default:
      return state;
  }
}
