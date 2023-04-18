import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import NotesList from '../NotesList/NotesList';
import DateForm from '../DateForm/DateForm';

import Calendar from 'react-calendar';
import '../DisplayCalendar/Calendar.css';

function DisplayCalendar() {
    // local state
    let [allNotesIsVisible, setNotesVis] = useState(true),
        [dateFormIsVisible, setFormVis] = useState(false),
        [isPut, setPut] = useState(false),
        [dateClicked, setDateClicked] = useState({});


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

    const dayClick = (value, event) => {
        // check if date is in the store
        // - if yes -> isPut = true
        //      else -> dateFormisVisible -> true
        console.log(value);
        return alert('Clicked day: ', value);
    }
    return (
        <div className='flex-container'>
            <Calendar isPut={isPut} dateFormIsVisible={dateFormIsVisible} calendarType='US'
                onClickDay={dayClick} />
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