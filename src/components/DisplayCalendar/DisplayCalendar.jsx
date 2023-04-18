import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import Calendar from 'react-calendar';
import '../DisplayCalendar/Calendar.css';
import Button from '@mui/material/Button';

function DisplayCalendar() {

    const habitLog = useSelector(store => store.habitLog);
    const user = useSelector(store => store.user);
    console.log('current habitLog in DisplayCalendar', habitLog);
    

    // declare dispatch
    const dispatch = useDispatch();

    // sample data
    const sampleNotes = ['yay', 'sad', 'did great', 'ah shucks', 'gee willickers'];

    
    useEffect(() => {
        dispatch({ type: 'FETCH_LOG', payload: user });
        // console.log('current habit after FETCH_CURRENT_HABIT dispatch', currentHabit);
        }, [])

    const dayClick = (value, event) => {
        return alert('Clicked day: ', value);
    }
    return (
        <div className='flex-container'>
            <Calendar calendarType='US'
                onClickDay={dayClick} />
            <div id='notesContainer'>
                <h3>All Notes</h3>

                <ul>
                    {sampleNotes.map((note, i) =>
                        <li key={i}><Button>{note}</Button></li>
                    )}
                </ul>

            </div>
        </div>
    )
}

export default DisplayCalendar;