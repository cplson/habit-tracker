import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import NotesList from '../NotesList/NotesList';
import DateModal from '../DateModal/DateModal';

import Calendar from 'react-calendar';
import '../DisplayCalendar/Calendar.css';
import { DateTime } from "luxon";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


function DisplayCalendar() {
    // local state
    let [visibility, toggleVis] = useState(false),
        [dateClicked, setDateClicked] = useState(new Date()),
        [dateClickedString, setDateClickedString] = useState(''),
        [isPut, setType] = useState(true),
        [thisLog, setLog] = useState({});

    // store
    const habitLog = useSelector(store => store.habitLog);
    const user = useSelector(store => store.user);


    // declare dispatch
    const dispatch = useDispatch();



    useEffect(() => {
        dispatch({ type: 'FETCH_LOG', payload: user });
    }, [])



    const dayClick = (value, event) => {
        console.log('trying event.detail');
        // set temp date needed to transfer to DateTime
        let tempDate = new Date(value.toISOString());
        // temp DateTime object that will be used to set the local state
        let rawDT = new DateTime.fromISO(tempDate.toISOString())

        // // dateClickedString will be used to display date in the modal
        // dateClicked will keep a Date object to compare against log dates
        setDateClickedString(rawDT.toFormat('MMMM dd, yyyy'));
        setDateClicked(new Date(value));


        // reset state
        setType(false);
        // if dateClicked matches a log entry, open form to edit the current data
        // else open form to create new log entry
        for (let log of habitLog) {
            // console.log(log.date, value.toISOString());

            if (log.date === value.toISOString()) {
                // console.log('found a match');
                // display PutModal
                setType(true);
                setLog(log);
                // dispatch to store this student info in redux
                dispatch({ type: 'SET_EDIT_LOG', payload: log });
            }
        }

        toggleVis(true);
    }

    const setContent = (date) => {
        let loggedDate = {};


        for (let log of habitLog) {
            // console.log(date.toISOString(), log.date);
            if (log.date == date.toISOString()) {
                // console.log('found a match');
                loggedDate = { length: 4, ...log }
            }
        }
        console.log(loggedDate);
        
        return <p>{loggedDate.notes}</p>
    }

    const setStatus = date => {
        for (let log of habitLog) {
            if (log.date == date.toISOString()) {
                return log.status;
            }
        }
    }

    return (
        <div className='flex-container'>
            <Calendar calendarType='US'
                onClickDay={(value, event) => dayClick(value, event)}
                tileContent={({ date }) => setContent(date)}
                tileClassName={({ date }) => setStatus(date)}
            />

            <div >
                <Card variant="outlined" id='notes-container'>
                    <CardContent>

                        <div id='note-list'>
                            <h3>All Notes</h3>
                            <NotesList />
                        </div>
                    </CardContent>
                </Card>


            </div>{/* conditionally render PostModal and PutModal */}
            {visibility && <DateModal
                toggleVis={toggleVis} dateClicked={dateClicked}
                dateClickedString={dateClickedString} isPut={isPut}
                thisLog={thisLog} setLog={setLog} setDateClicked={setDateClicked}
                setDateClickedString={setDateClickedString}/>}
        </div>
    )
}

export default DisplayCalendar;