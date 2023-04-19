import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import NotesList from '../NotesList/NotesList';
import DateForm from '../DateForm/DateForm';
import PostModal from '../PostModal/PostModal';

import Calendar from 'react-calendar';
import '../DisplayCalendar/Calendar.css';
import { DateTime } from "luxon";

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

function DisplayCalendar() {
    // local state
    let [visibility, toggleVis] = useState(false),
        [dateClicked, setDateClicked] = useState(new Date()),
        [dateClickedString, setDateClickedString] = useState('');


    // store
    const habitLog = useSelector(store => store.habitLog);
    const user = useSelector(store => store.user);
    console.log('current habitLog in DisplayCalendar', habitLog);


    // declare dispatch
    const dispatch = useDispatch();



    useEffect(() => {
        dispatch({ type: 'FETCH_LOG', payload: user });
        // console.log('current habit after FETCH_CURRENT_HABIT dispatch', currentHabit);
    }, [])



    const dayClick = (value) => {
        // set temp date needed to transfer to DateTime
        let tempDate = new Date(value.toISOString());
        // temp DateTime object that will be used to set the local state
        let rawDT = new DateTime.fromISO(tempDate.toISOString())
        console.log('rawDT', rawDT);

        // // dateClickedString will be used to display date in the modal
        // dateClicked will keep a Date object to compare against log dates
        setDateClickedString(rawDT.toFormat('MMMM dd, yyyy'));
        setDateClicked(new Date(value));
        
        // display modal 
        toggleVis(true); 

    }


    return (
        <div className='flex-container'>
            <Calendar calendarType='US'
                onChange={dayClick} />

            <div id='notesContainer'>
                <Card variant="outlined">
                    <CardContent>
                        {/* conditionally render PostModal */}
                        {visibility && <PostModal toggleVis={toggleVis} dateClicked={dateClicked} dateClickedString={dateClickedString}/>}
                        <div>


                            <h3>All Notes</h3>

                            <NotesList />
                        </div>

                    </CardContent>
                </Card>


            </div>
        </div>
    )
}

export default DisplayCalendar;