import {useEffect} from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import HabitsList from '../HabitsList/HabitsList';
import DisplayCalendar from '../DisplayCalendar/DisplayCalendar';


function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  // declare history
  const history = useHistory();
  // declare dispatch
  const dispatch = useDispatch();
  // get user info from store
  const user = useSelector((store) => store.user);
  const habits = useSelector(store => store.habits);
  
  // const motivations = useSelector(store => store.motivations);
  // const blessings = useSelector(store => store.blessings);
  // const habitLog = useSelector(store => habitLog);
  //console.log(habits[0].id);
  // on page load get habit log info
  // from the store
  
  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      {/* <div>
        <DisplayCalendar />
      </div> */}
      
      <LogOutButton className="btn" />
      <HabitsList />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
