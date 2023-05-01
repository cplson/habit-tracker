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
    const habits = useSelector(store => store.habits);

    let activeHabit;

    for(let habit of habits){
        if(user.active_habit_id === habit.id){
            activeHabit = habit.description;
        }
    }


    // declare dispatch
    const dispatch = useDispatch();



    useEffect(() => {
        dispatch({ type: 'FETCH_LOG', payload: user });
        dispatch({type: 'FETCH_HABITS'});
    }, [])



    const dayClick = (value, event) => {
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
        if(event.detail === 2){

            for (let log of habitLog) {
                // console.log(log.date, value.toISOString());
                let dateValue = log.date.split('T');
                let valueValue = value.toISOString().split('T');
                console.log(dateValue, valueValue);
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
    }

    const setContent = (date) => {
        let loggedDate = {};
        // console.log('inside setContent()');

        for (let log of habitLog) {
            // console.log(date.toISOString(), log.date);
            if (log.date == date.toISOString()) {
                // console.log('found a match in setContent');
                loggedDate = { length: 4, ...log }
            }
        }
        
        return <p>{loggedDate.notes}</p>
    }

    const setStatus = date => {
        // console.log('inside setStatus()');
        for (let log of habitLog) {
            // console.log('log.date is:', log.date)
            // console.log('date.toISOString() is', date.toISOString());
            if (log.date == date.toISOString()) {
                // console.log('found a match in setStatus');
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
                            <h3>All Notes - {activeHabit}</h3>
                            <NotesList activeHabit={activeHabit}/>
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