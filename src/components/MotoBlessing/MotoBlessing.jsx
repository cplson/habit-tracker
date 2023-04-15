import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import MotoForm  from '../MotoForm/MotoForm';
import BlessingForm from '../BlessingForm/BlessingForm';

function MotoBlessing(){
// get user data from the store
const user = useSelector(store => store.user);
// get motivations from the store
const motivations = useSelector(store => store.motivations);
console.log('motivations from MotoBlessings component:', motivations);

// declare dispatch
const dispatch = useDispatch();

// on page load send dispatch to 
// fetch the motivations from the store
useEffect(() => {
    dispatch({
        type: 'FETCH_MOTIVATIONS',
        payload: user.id
    })
}, [])
    return (

        // MAKE THIS CONTAINER FLEXBOX
        <div className='container'>
            <MotoForm />
            <h3>Motivations</h3>
            {/* LIST HERE */}

            <BlessingForm />
            <h3>Blessings</h3>
            {/* LIST HERE */}

            
        </div>
    );
}

export default MotoBlessing;