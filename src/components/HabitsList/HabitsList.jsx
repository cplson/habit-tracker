import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
function HabitsList(){
    // get habits from the store
    const habits = useSelector(store => store.habits);
    // declare dispatch
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: 'FETCH_HABITS'
        })
    }, [])
    return 'yay';
}

export default HabitsList;