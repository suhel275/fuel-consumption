import React, { useContext, useEffect } from 'react';
import FuelContext from '../../context/fuel/fuelContext';
import FetchContext from '../../context/fetch/fetchContext';
import AuthContext from '../../context/auth/authContext';
import * as ReactBootStrap from 'react-bootstrap';

const Report = (props) => {
  const fuelContext = useContext(FuelContext);
  const fetchContext = useContext(FetchContext);
  const authContext = useContext(AuthContext);

  const { airports, getAirports } = fetchContext;
  const { report, getReport } = fuelContext;

  useEffect(() => {
    authContext.loadUser();
    getAirports();
    getReport();
    // eslint-disable-next-line
  }, [authContext]);

  const renderLine = (line) => {
    return (
      <tr>
        <td>{line.date}</td>
        <td>{line.type}</td>
        <td>{line.quantity}</td>
        <td>{line.aircraft_no}</td>
      </tr>
    );
  };

  const renderAirport = (airport) => {
    return (
      <tr>
        <td>{airport.name}</td>
        <td>{airport.fuel_available}</td>
      </tr>
    );
  };

  return (
    <div>
      <h1>Airport Summary Report</h1>
      <ReactBootStrap.Table striped bordered hover>
        <thead>
          <tr>
            <th>Airport</th>
            <th>Fuel Available</th>
          </tr>
        </thead>
        <tbody>{airports && airports.map(renderAirport)}</tbody>
      </ReactBootStrap.Table>
      <h1>Fuel Consumption Report</h1>
      {report &&
        report.map((lines) => (
          <div>
            <h3>Airport: {lines[0].airport_name}</h3>
            <h5>Fuel Available: {lines[0].fuel_available}</h5>
            <ReactBootStrap.Table striped bordered hover>
              <thead>
                <tr>
                  <th>Date/Time</th>
                  <th>Type</th>
                  <th>Fuel</th>
                  <th>Aircraft</th>
                </tr>
              </thead>
              <tbody>{lines && lines.map(renderLine)}</tbody>
            </ReactBootStrap.Table>
          </div>
        ))}
    </div>
  );
};

export default Report;
