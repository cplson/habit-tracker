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
        [isPut, setPut] = useState(false),
        [dateClicked, setDateClicked] = useState(new Date());


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
        toggleVis(true);
        // TO DO: A LOT

        // habitLog.forEach(log => {
        //     if(log.date === dateClicked){
        //         setPut(true);
        //     }
        //     else{
        //         setPut(false)
        //     }
        //     setNotesVis(false);
        //     setFormVis(true);
        //     console.log(log.date, dateClicked);
        // })

        // console.log('if 10 or 16 expected output is true', isPut);
        // check if date is in the store
        // - if yes -> isPut = true
        //      else -> dateFormisVisible -> true
        console.log('here');
        
    }

    
    return (
        <div className='flex-container'>
            <Calendar isPut={isPut} calendarType='US'
                onChange={dayClick}/>
                
            <div id='notesContainer'>
                <Card variant="outlined">
                    <CardContent>
                        {/* conditionally render PostModal */}
                        {visibility && <PostModal toggleVis={toggleVis}/>}
                            <div>

                                <Typography>
                                    <h3>All Notes</h3>
                                </Typography>
                                <NotesList isPut={isPut} />
                            </div> 
                            
                    </CardContent>
                </Card>


            </div>
        </div>
    )
}

export default DisplayCalendar;