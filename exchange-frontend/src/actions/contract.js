import * as types from '../constants/ActionTypes';
import * as api from '../utils/api/contract';

export const fetchContractInfos = () => async (dispatch) => {
  const infos = await api.getContractInfos();
  dispatch({
    type: types.EDIT_CONTRACT_INFOS,
    value: infos,
  });
};
