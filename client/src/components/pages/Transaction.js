import React, { useState, useContext, useEffect } from 'react';
import FuelContext from '../../context/fuel/fuelContext';
import FetchContext from '../../context/fetch/fetchContext';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';
import * as ReactBootStrap from 'react-bootstrap';

const Transaction = (props) => {
  const alertContext = useContext(AlertContext);
  const fuelContext = useContext(FuelContext);
  const fetchContext = useContext(FetchContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const {
    addTransaction,
    error,
    isAdded,
    transactions,
    getTransactions,
    clearIsAdded,
    removeTransactions,
  } = fuelContext;
  const { clearErrors, loadUser } = authContext;
  const { airports, getAirports, aircrafts, getAircrafts } = fetchContext;

  useEffect(() => {
    if (isAdded) {
      setAlert('Transaction added successfully', 'success');
      clearIsAdded();
    }
    if (error) {
      setAlert(error, 'danger');
      clearErrors();
    }
    loadUser();
    getAirports();
    getAircrafts();
    getTransactions();

    // eslint-disable-next-line
  }, [error, isAdded]);

  const [transaction, setTransaction] = useState({
    type: '',
    airport_name: '',
    aircraft_no: '',
    quantity: '',
  });

  const { type, airport_name, aircraft_no, quantity } = transaction;

  const renderAirports = () => {
    return (
      airports &&
      airports.map((airport) => (
        <option key={airport._id} value={`${airport.name}`}>
          {airport.name}
        </option>
      ))
    );
  };

  const renderAircrafts = () => {
    return (
      aircrafts &&
      aircrafts.map((aircraft) => (
        <option key={aircraft._id} value={`${aircraft.no}`}>
          {aircraft.no}
        </option>
      ))
    );
  };

  const renderTransaction = (transaction) => {
    return (
      <tr>
        <td>{transaction.date}</td>
        <td>{transaction.airport_name}</td>
        <td>{transaction.aircraft_no}</td>
        <td>{transaction.type}</td>
        <td>{transaction.quantity}</td>
      </tr>
    );
  };

  const removeAll = () => {
    removeTransactions();
  };

  const onChange = (e) =>
    setTransaction({ ...transaction, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addTransaction(transaction);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <h2 className='text-primary'>Add Transaction</h2>
        <h5>Transaction Type</h5>
        <input
          type='radio'
          name='type'
          value='IN'
          checked={type === 'IN'}
          onChange={onChange}
        />{' '}
        IN{' '}
        <input
          type='radio'
          name='type'
          value='OUT'
          checked={type === 'OUT'}
          onChange={onChange}
        />{' '}
        OUT
        <select name='airport_name' value={airport_name} onChange={onChange}>
          <option value='' disabled>
            Select Airport
          </option>
          {renderAirports()}
        </select>
        <select name='aircraft_no' value={aircraft_no} onChange={onChange}>
          <option value='' disabled>
            Select Aircraft
          </option>
          {type === 'OUT' && renderAircrafts()}
        </select>
        <input
          type='text'
          placeholder='Quantity'
          name='quantity'
          value={quantity}
          onChange={onChange}
        />
        <div>
          <input
            type='submit'
            value='Add Transaction'
            className='btn btn-primary btn-block'
          />
        </div>
        <div>
          <button className='btn btn-light btn-block' onClick={removeAll}>
            Remove All Transactions
          </button>
        </div>
      </form>
      <ReactBootStrap.Table striped bordered hover>
        <thead>
          <tr>
            <th>Date/Time</th>
            <th>Airport Name</th>
            <th>Aircraft No</th>
            <th>Type</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>{transactions && transactions.map(renderTransaction)}</tbody>
      </ReactBootStrap.Table>
    </div>
  );
};

export default Transaction;
