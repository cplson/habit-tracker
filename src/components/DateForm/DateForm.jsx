import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { DateTime } from "luxon";



function DateForm({ dateClicked, dateClickedString={dateClickedString} }) {

    // store
    const habitLog = useSelector(store => store.habitLog);
    const habitId = useSelector(store => store.user.active_habit_id);

    // local state
    const [status, setStatus] = useState('');
    const [notes, setNotes] = useState('');
    const [isPost, setPost] = useState(true);

    // dispatch
    const dispatch = useDispatch();

    // local vars
    let newDate = { habit_id: habitId, date: dateClicked, status: '', notes: '' }
    let dateTimeClicked;
    let dtString;
    // on ready DOM, determine request type
    useEffect(() => {
        console.log('dateClicked', dateClicked, dateClicked.toISOString());
        for(let log of habitLog){
            if(log.date === dateClicked.toISOString()){
                console.log('Found a match');
                setPost(true);
            }
            else{
                setPost(false);
            }
            let tempDate = new Date(dateClicked.toISOString());
            console.log(tempDate);
            dateTimeClicked = new DateTime.fromISO(dateClicked.toISOString())
            dtString = dateTimeClicked.toFormat('MMMM dd, yyyy')
            console.log(dtString);
            // will probably have to use this dateClicked.toFormat('MMMM dd, yyyy')
        }   // first need to get dateClicked back to a date not a string
    }, []);
    const handleSubmit = () => {
        

        newDate.status = status;
        newDate.notes = notes;

        dispatch({
            type: 'ADD_TO_LOG',
            payload: newDate
        })
        // if(isPut){
        //     // PUT dispatch
        // }
        // else(
        //     // POST dispatch
        // )
        
        console.log('yay submitted with data:', newDate);

    }

    const handleChange = (event) => {
        setStatus(event.target.value);
    };
    const handleText = event => {
        setNotes(event.target.value);
    }
    return (
        <div>
            <h4>{dateClickedString}</h4>
            <form onSubmit={handleSubmit}>

                <FormControl fullWidth>
                    <InputLabel id="statusLabel">Status</InputLabel>
                    <Select
                        labelId="statusLabel"
                        id="dateFormStatus"
                        value={status}
                        label="status"
                        onChange={handleChange}
                    >
                        <MenuItem value={'Default'}>Default</MenuItem>
                        <MenuItem value={'Successful'}>Successful</MenuItem>
                        <MenuItem value={'Unsuccessful'}>Unsuccessful</MenuItem>
                    </Select>
                    <TextareaAutosize
                        aria-label="empty textarea"
                        value={notes}
                        placeholder="Notes"
                        style={{ width: 400 }}
                        onChange={handleText}
                    />
                    <Button type='submit'>Submit</Button>
                </FormControl>
            </form>
        </div>
    )
}

export default DateForm;