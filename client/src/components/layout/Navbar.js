import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const Navbar = ({ title }) => {
  const authContext = useContext(AuthContext);

  const { isAuthenticated, logout, user } = authContext;

  const onLogout = () => {
    logout();
  };

  const authLinks = (
    <Fragment>
      <li>
        <Link to='/airport'>Airport</Link>
      </li>
      <li>
        <Link to='/aircraft'>Aircraft</Link>
      </li>
      <li>
        <Link to='/transaction'>Transation</Link>
      </li>
      <li>
        <Link to='/'>Reports</Link>
      </li>
      <li>Hello {user && user.name}</li>
      <li>
        <a onClick={onLogout} href='#!'>
          <i className='fas fa-sign-out-alt'></i>{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </Fragment>
  );

  return (
    <div className='navbar bg-primary'>
      <h1>{title}</h1>
      <ul>{isAuthenticated && authLinks}</ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
};

Navbar.defaultProps = {
  title: 'Airport Fuel Inventory',
};

export default Navbar;
