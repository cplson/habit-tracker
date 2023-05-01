import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HabitForm from '../HabitForm/HabitForm';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import { useHistory } from 'react-router-dom';
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
    // declare history
    const history = useHistory();

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
            <h2>Habits</h2>
            {
                habits.length > 0 ?
                    <ul>
                        {habits.map(habit =>
                            <li key={habit.id}>
                                <Button onClick={() =>
                                    dispatch({ type: 'DELETE_HABIT', payload: habit })}>
                                    <DeleteForeverIcon className='delete-habit'/>
                                </Button>
                                <Button onClick={() =>
                                    <>
                                        {/* {dispatch({ type: 'FETCH_LOG', payload: habit })} */}
                                        {dispatch({ type: 'SET_ACTIVE_HABIT', payload: habit })}
                                        {history.push('/calendar')}
                                    </>
                                }>
                                    {habit.description}
                                </Button>
                            </li>)}
                    </ul>
                    :
                    <p>You do not yet have any habits</p>
            }
            
            <HabitForm />
        </>
    );
}

export default HabitsList;