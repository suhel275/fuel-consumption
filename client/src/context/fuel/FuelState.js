import React, { useReducer } from 'react';
import axios from 'axios';
import FuelContext from './fuelContext';
import fuelReducer from './fuelReducer';
import {
  GET_REPORT,
  GET_TRANSACTIONS,
  FUEL_ERROR,
  ADD_TRANSACTION,
  CLEAR_ISADDED,
} from '../types';

const FuelState = (props) => {
  const initialState = {
    transactions: null,
    isAdded: null,
    report: null,
    error: null,
  };

  const [state, dispatch] = useReducer(fuelReducer, initialState);

  // Get Report
  const getReport = async () => {
    try {
      const res = await axios.get('/api/report');

      dispatch({
        type: GET_REPORT,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: FUEL_ERROR,
        payload: err,
      });
    }
  };

  // Add Transacrion
  const addTransaction = async (transaction) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      await axios.post('/api/transactions', transaction, config);
      dispatch({
        type: ADD_TRANSACTION,
      });
    } catch (err) {
      dispatch({
        type: FUEL_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Get Transactions
  const getTransactions = async () => {
    try {
      const res = await axios.get('/api/transactions');

      dispatch({
        type: GET_TRANSACTIONS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: FUEL_ERROR,
        payload: err,
      });
    }
  };

  const removeTransactions = async () => {
    try {
      await axios.delete('/api/transactions');
    } catch (err) {
      dispatch({
        type: FUEL_ERROR,
        payload: err,
      });
    }
  };

  // Clear isAdded
  const clearIsAdded = () => dispatch({ type: CLEAR_ISADDED });

  return (
    <FuelContext.Provider
      value={{
        report: state.report,
        error: state.error,
        transactions: state.transactions,
        isAdded: state.isAdded,
        getTransactions,
        addTransaction,
        getReport,
        clearIsAdded,
        removeTransactions,
      }}
    >
      {props.children}
    </FuelContext.Provider>
  );
};

export default FuelState;
