import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import Calendar from 'react-calendar';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  // get user info from store
  const user = useSelector((store) => store.user);
  // const habits = useSelector(store => store.habits);
  // const motivations = useSelector(store => store.motivations);
  // const blessings = useSelector(store => store.blessings);

  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <div>
        <Calendar />
      </div>
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
