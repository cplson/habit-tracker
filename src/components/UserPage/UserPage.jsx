import { useEffect, useState } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import HabitsList from '../HabitsList/HabitsList';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Motivations from '../Motivations/Motivations';
import Blessings from '../Blessings/Blessings';



function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  // declare history
  const history = useHistory();
  // declare dispatch
  const dispatch = useDispatch();
  // get user info from store
  const user = useSelector((store) => store.user);
  const habits = useSelector(store => store.habits);

  const blessings = useSelector(store => store.blessings);



  return (
    <>

      <div id="user-container">
        

        <div id='main-container'>
          <div id="welcome-container">
            <h2>Welcome, {user.username}!</h2>
          </div>

          <div id='card-container'>
          <Card id='aside-container'>
          <CardContent>
            <HabitsList />
          </CardContent>
        </Card>
            <Card variant='outlined' className="reflection-card">
              <CardContent>
                <Motivations />
              </CardContent>
            </Card>
            <Card variant='outlined' className="reflection-card">
              <CardContent>
                <Blessings />
              </CardContent>
            </Card>
          </div>
        </div>

      </div>

    </>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
