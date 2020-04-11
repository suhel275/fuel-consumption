import {
  GET_REPORT,
  GET_TRANSACTIONS,
  FUEL_ERROR,
  ADD_TRANSACTION,
  CLEAR_ISADDED,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_REPORT:
      return {
        ...state,
        report: action.payload,
      };
    case GET_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload,
      };
    case ADD_TRANSACTION:
      return {
        ...state,
        isAdded: true,
      };
    case FUEL_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case CLEAR_ISADDED:
      return {
        ...state,
        isAdded: null,
      };
    default:
      return state;
  }
};
