import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HabitForm from '../HabitForm/HabitForm';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Button from '@mui/material/Button';
function HabitsList() {
    // get habits from the store
    const habits = useSelector(store => store.habits);
    // declare dispatch
    const dispatch = useDispatch();
    console.log('habits in HabitsList:', habits);
    useEffect(() => {
        dispatch({
            type: 'FETCH_HABITS'
        })
    }, [])
    return (
        <>
            <HabitForm />
            {
                habits.length > 0 ?
                    <ul>
                        {habits.map(habit => <li key={habit.id}>{habit.description} <Button><DeleteForeverIcon /></Button></li>)}
                    </ul>
                    :
                    <p>You do not yet have any habits</p>
            }
        </>
    );
}

export default HabitsList;