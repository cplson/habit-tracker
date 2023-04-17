import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HabitForm from '../HabitForm/HabitForm';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Button from '@mui/material/Button';
function HabitsList() {
    // get habits from the store
    const habits = useSelector(store => store.habits);
    const habitLog = useSelector(store => store.habitLog);
    // local state
    let [habit_id, setHabitId] = useState(0);
    let [date, setDate] = useState('');
    let [status, setStatus] = useState('');
    let [notes, setNotes] = useState(''); 
    // declare dispatch
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: 'FETCH_HABITS'
        })
    }, [])

    const handleSubmit = () => {
        console.log('inside handleSubmit');
        dispatch({
            type: 'ADD_TO_LOG',
            payload: {
                habit_id,
                date,
                status,
                notes
            }
        })
        setHabitId(0);
        setDate('');
        setStatus('');
        setNotes('');
    }
    return (
        <>
            <HabitForm />
            {
                habits.length > 0 ?
                    <ul>
                        {habits.map(habit =>
                            <li key={habit.id}>
                                <Button onClick={()=> 
                                    dispatch({type: 'FETCH_LOG', payload: habit})}>
                                        {habit.description}
                                        

                                </Button>
                                <Button onClick={() => 
                                    dispatch({ type: 'DELETE_HABIT', payload: habit })}>
                                        <DeleteForeverIcon />
                                </Button>
                            </li>)}
                    </ul>
                    :
                    <p>You do not yet have any habits</p>
            }
            <h3>Habit Log</h3>
            <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="habit_id">
                    habit_id:
                    <input
                        type="number"
                        name="habit_id"
                        value={habit_id}
                        required
                        onChange={(event) => setHabitId(event.target.value)}
                    />
                </label>
                <label htmlFor="date">
                    Date:
                    <input
                        type="text"
                        name="date"
                        value={date}
                        required
                        onChange={(event) => setDate(event.target.value)}
                    />
                </label>
                <label htmlFor="status">
                    Status:
                    <input
                        type="text"
                        name="status"
                        value={status}
                        required
                        onChange={(event) => setStatus(event.target.value)}
                    />
                </label>
                <label htmlFor="Notes">
                    Notes:
                    <input
                        type="text"
                        name="Notes"
                        value={notes}
                        onChange={(event) => setNotes(event.target.value)}
                    />
                </label>
                <button type="submit">Submit</button>
            </div>
            </form>
            {
                habitLog.length > 0 ?
                    <ul>
                        {habitLog.map(day => <li key={day.notes}>Date: {day.date} Status: {day.status} Note: {day.notes}</li>)}
                    </ul>
                :
                <p>no history recorded for this habit yet.</p>
            }
        </>
    );
}

export default HabitsList;