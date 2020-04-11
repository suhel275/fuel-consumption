import React, { useState, useContext, useEffect } from 'react';
import FetchContext from '../../context/fetch/fetchContext';
import AuthContext from '../../context/auth/authContext';
import FuelContext from '../../context/fuel/fuelContext';
import AlertContext from '../../context/alert/alertContext';
import * as ReactBootStrap from 'react-bootstrap';

const Airports = (props) => {
  const alertContext = useContext(AlertContext);
  const fetchContext = useContext(FetchContext);
  const authContext = useContext(AuthContext);
  const fuelContext = useContext(FuelContext);

  const { airports, getAirports, error, addAirport, isAdded } = fetchContext;
  const { clearIsAdded } = fuelContext;
  const { setAlert } = alertContext;
  const { clearErrors, loadUser } = authContext;

  useEffect(() => {
    if (isAdded) {
      setAlert('Airport added successfully', 'success');
      clearIsAdded();
    }
    if (error) {
      setAlert(error, 'danger');
      clearErrors();
    }
    loadUser();
    getAirports();

    // eslint-disable-next-line
  }, [error, isAdded]);

  const [airport, setAirport] = useState({
    name: '',
    fuel_capacity: '',
    fuel_available: '',
  });

  const { name, fuel_capacity, fuel_available } = airport;

  const renderAirport = (airport) => {
    return (
      <tr>
        <td>{airport.name}</td>
        <td>{airport.fuel_capacity}</td>
        <td>{airport.fuel_available}</td>
      </tr>
    );
  };

  const onChange = (e) =>
    setAirport({ ...airport, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (name === '' || fuel_capacity === '' || fuel_available === '') {
      setAlert('Please fill in all fields', 'danger');
    } else {
      addAirport(airport);
    }
  };

  return (
    <div>
      <ReactBootStrap.Table striped bordered hover>
        <thead>
          <tr>
            <th>Airport Name</th>
            <th>Fuel Capacity</th>
            <th>Fuel Available</th>
          </tr>
        </thead>
        <tbody>{airports && airports.map(renderAirport)}</tbody>
      </ReactBootStrap.Table>
      <form onSubmit={onSubmit}>
        <input
          type='text'
          placeholder='Airport Name'
          name='name'
          value={name}
          onChange={onChange}
          required
        />
        <input
          type='text'
          placeholder='Fuel Capacity'
          name='fuel_capacity'
          value={fuel_capacity}
          onChange={onChange}
          required
        />
        <input
          type='text'
          placeholder='Fuel Available'
          name='fuel_available'
          value={fuel_available}
          onChange={onChange}
          required
        />
        <input
          type='submit'
          value='Add Airport'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

export default Airports;
