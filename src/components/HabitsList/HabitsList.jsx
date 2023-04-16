import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
            {
                habits.length > 0 ?
                    <ul>
                        {habits.map(habit => <li key={habit.id}>{habit.description}</li>)}
                    </ul>
                    :
                    <p>You do not yet have any habits</p>
            }
        </>
    );
}

export default HabitsList;