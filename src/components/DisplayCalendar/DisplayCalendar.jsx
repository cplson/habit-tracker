import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import NotesList from '../NotesList/NotesList';
import DateForm from '../DateForm/DateForm';

import Calendar from 'react-calendar';
import '../DisplayCalendar/Calendar.css';
import { DateTime } from "luxon";

function DisplayCalendar() {
    // local state
    let [allNotesIsVisible, setNotesVis] = useState(true),
        [dateFormIsVisible, setFormVis] = useState(false),
        [isPut, setPut] = useState(false),
        [dateClicked, setDateClicked] = useState(new Date());
        console.log(dateClicked);

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
        let newDT = new DateTime.fromISO(tempDate.toISOString())
        // set the local state 'dateClicked' to the desired format
        setDateClicked(newDT.toFormat('MMMM dd, yyyy'));
        
        // check if date is in the store
        // - if yes -> isPut = true
        //      else -> dateFormisVisible -> true
        
    }
    return (
        <div className='flex-container'>
            <Calendar isPut={isPut} dateFormIsVisible={dateFormIsVisible} calendarType='US'
                onChange={dayClick}/>
            <div id='notesContainer'>
                <div>
                    <h3>All Notes</h3>
                    <NotesList allNotesIsVisible={allNotesIsVisible} isPut={isPut}/>
                    <DateForm isPut={isPut} />
                </div>

            </div>
        </div>
    )
}

export default DisplayCalendar;