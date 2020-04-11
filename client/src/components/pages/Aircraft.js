import React, { useState, useContext, useEffect } from 'react';
import FetchContext from '../../context/fetch/fetchContext';
import AuthContext from '../../context/auth/authContext';
import FuelContext from '../../context/fuel/fuelContext';
import AlertContext from '../../context/alert/alertContext';
import * as ReactBootStrap from 'react-bootstrap';

const Aircrafts = (props) => {
  const alertContext = useContext(AlertContext);
  const fetchContext = useContext(FetchContext);
  const authContext = useContext(AuthContext);
  const fuelContext = useContext(FuelContext);

  const { aircrafts, getAircrafts, error, addAircraft, isAdded } = fetchContext;
  const { clearIsAdded } = fuelContext;
  const { setAlert } = alertContext;
  const { clearErrors, loadUser } = authContext;

  useEffect(() => {
    if (isAdded) {
      setAlert('Aircraft added successfully', 'success');
      clearIsAdded();
    }
    if (error) {
      setAlert(error, 'danger');
      clearErrors();
    }
    loadUser();
    getAircrafts();

    // eslint-disable-next-line
  }, [error, isAdded]);

  const [aircraft, setAircraft] = useState({
    no: '',
    airline: '',
    source: '',
    destination: '',
  });

  const { no, airline, source, destination } = aircraft;

  const renderAircraft = (aircraft) => {
    return (
      <tr>
        <td>{aircraft.no}</td>
        <td>{aircraft.airline}</td>
        <td>{aircraft.source}</td>
        <td>{aircraft.destination}</td>
      </tr>
    );
  };

  const onChange = (e) =>
    setAircraft({ ...aircraft, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (no === '' || airline === '' || source === '' || destination === '') {
      setAlert('Please fill in all fields', 'danger');
    } else {
      addAircraft(aircraft);
    }
  };

  return (
    <div>
      <ReactBootStrap.Table striped bordered hover>
        <thead>
          <tr>
            <th>Aircraft No</th>
            <th>Airline</th>
            <th>Source</th>
            <th>Destination</th>
          </tr>
        </thead>
        <tbody>{aircrafts && aircrafts.map(renderAircraft)}</tbody>
      </ReactBootStrap.Table>
      <form onSubmit={onSubmit}>
        <input
          type='text'
          placeholder='Aircraft No'
          name='no'
          value={no}
          onChange={onChange}
          required
        />
        <input
          type='text'
          placeholder='Airline'
          name='airline'
          value={airline}
          onChange={onChange}
          required
        />
        <input
          type='text'
          placeholder='Source'
          name='source'
          value={source}
          onChange={onChange}
          required
        />
        <input
          type='text'
          placeholder='Destination'
          name='destination'
          value={destination}
          onChange={onChange}
          required
        />
        <input
          type='submit'
          value='Add Aircraft'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

export default Aircrafts;
