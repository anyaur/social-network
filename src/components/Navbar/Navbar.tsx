import React from 'react';
import { Routes, Route, BrowserRouter, NavLink } from 'react-router-dom';
import Dialogs from '../Dialogs/Dialogs';
import Profile from '../Profile/Profile';
import classes from './Navbar.module.css';

const Navbar = () => {
  return (
      <nav className={classes.nav}>
        <div>
          <NavLink to='Profile' className={({ isActive }) => isActive ? `${classes.active}` : `${classes.inactive}`}>
            Profile</NavLink>
        </div>
        <div>
          <NavLink to='Messages' className={({ isActive }) => isActive ? `${classes.active}` : `${classes.inactive}`}>
            Messages</NavLink>
        </div>
        <div>
          <NavLink to='News' className={({ isActive }) => isActive ? `${classes.active}` : `${classes.inactive}`}>
            News</NavLink>
        </div>
        <div>
          <NavLink to='Users' className={({ isActive }) => isActive ? `${classes.active}` : `${classes.inactive}`}>
            Users</NavLink>
        </div>
      </nav>

  )
}

export default Navbar;