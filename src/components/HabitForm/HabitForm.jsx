import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function HabitForm() {
    // local state
    let [description, setDescription] = useState('');
    
    // declare dispatch
    const dispatch = useDispatch();

    const handleSubmit = event => {
        dispatch({
            type: 'ADD_HABIT',
            payload: {description}
        })
        setDescription('');
    }

    return (
        <form id='habit-form' onSubmit={handleSubmit}>
            <div>
                
                    <TextField
                    size='small'
                        label="new habit"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                    />
                
                <Button variant='contained' type="submit" sx={{backgroundColor: '#279AF1'}}>Add</Button>
            </div>
        </form>
    );
}

export default HabitForm;