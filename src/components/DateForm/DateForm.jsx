import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextareaAutosize from '@mui/base/TextareaAutosize';



function DateForm({ isPut, dateClicked }) {

    // store
    const habitLog = useSelector(store => store.habitLog);
    const habitId = useSelector(store => store.user.active_habit_id);
    const [status, setStatus] = useState('');
    const [notes, setNotes] = useState('');

    // dispatch
    const dispatch = useDispatch();
    let newDate = { habit_id: habitId, date: dateClicked, status: '', notes: '' }

    const handleSubmit = () => {
        // if(isPut){
        //     // PUT dispatch
        // }
        // else(
        //     // POST dispatch
        // )

        newDate.status = status;
        newDate.notes = notes;

        dispatch({
            type: 'ADD_TO_LOG',
            payload: newDate
        })
        
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
            <h4>{dateClicked}</h4>
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