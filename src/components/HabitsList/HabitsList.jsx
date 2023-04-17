import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HabitForm from '../HabitForm/HabitForm';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Button from '@mui/material/Button';
function HabitsList() {
    // get habits from the store
    const habits = useSelector(store => store.habits);
    const habitLog = useSelector(store => store.habitLog);
    
    // declare dispatch
    const dispatch = useDispatch();
    console.log('days in HabitLog:', habitLog);
    useEffect(() => {
        dispatch({
            type: 'FETCH_HABITS'
        })
    }, [])

    const clearLogs = () => {

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