import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import NotesList from '../NotesList/NotesList';
import PostModal from '../PostModal/PostModal';
import PutModal from '../PutModal/PutModal';
import Calendar from 'react-calendar';
import '../DisplayCalendar/Calendar.css';
import { DateTime } from "luxon";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


function DisplayCalendar() {
    // local state
    let [postVis, togglePostVis] = useState(false),
        [putVis, togglePutVis] = useState(false),
        [dateClicked, setDateClicked] = useState(new Date()),
        [dateClickedString, setDateClickedString] = useState('');
        
    // store
    const habitLog = useSelector(store => store.habitLog);
    const user = useSelector(store => store.user);
    
    
    // declare dispatch
    const dispatch = useDispatch();



    useEffect(() => {
        dispatch({ type: 'FETCH_LOG', payload: user });
        
        // console.log('current habit after FETCH_CURRENT_HABIT dispatch', currentHabit);
    }, [])



    const dayClick = (value) => {
        console.log(value.toISOString());
        // set temp date needed to transfer to DateTime
        let tempDate = new Date(value.toISOString());
        // temp DateTime object that will be used to set the local state
        let rawDT = new DateTime.fromISO(tempDate.toISOString())

        // // dateClickedString will be used to display date in the modal
        // dateClicked will keep a Date object to compare against log dates
        setDateClickedString(rawDT.toFormat('MMMM dd, yyyy'));
        setDateClicked(new Date(value));
        console.log('Piece of shit date clicked', dateClicked);
        
        // if dateClicked matches a log entry, open form to edit the current data
        // else open form to create new log entry
        
        for(let log of habitLog){
            console.log( log.date, value.toISOString());

            if(log.date === value.toISOString()){
                console.log('found a match');
                // display PutModal
                togglePutVis(true)       
            }   
        }   
        if(putVis === false){
            // display PostModal 
            togglePostVis(true);
        }
    }

    return (
        <div className='flex-container'>
            <Calendar calendarType='US'
                onChange={event => dayClick(event)} />

            <div id='notesContainer'>
                <Card variant="outlined">
                    <CardContent>
                        {/* conditionally render PostModal and PutModal */}
                        {postVis && <PostModal toggleVis={togglePostVis} dateClicked={dateClicked} dateClickedString={dateClickedString}/>}
                        {putVis && <PutModal toggleVis={togglePutVis} dateClicked={dateClicked} dateClickedString={dateClickedString}/>}
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