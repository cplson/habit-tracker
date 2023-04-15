import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import MotoForm from '../MotoForm/MotoForm';
import BlessingForm from '../BlessingForm/BlessingForm';

function MotoBlessing() {
    // get user data from the store
    const user = useSelector(store => store.user);
    // get motivations from the store
    const motivations = useSelector(store => store.motivations);

    // get blessings from the store
    const blessings = useSelector(store => store.blessings);
    console.log('blessings from MotoBlessings component:', blessings);

    // declare dispatch
    const dispatch = useDispatch();

    // on page load send dispatch to 
    // fetch the motivations from the store
    useEffect(() => {
        dispatch({
            type: 'FETCH_MOTIVATIONS',
            payload: user.id
        })
        dispatch({
            type: 'FETCH_BLESSINGS',
            payload: user.id
        })
    }, [])
    return (

        // MAKE THIS CONTAINER FLEXBOX
        <div className='container'>
            <MotoForm />
            <h3>Motivations</h3>
            {
                motivations.length > 0 ?
                    <ul>
                        {motivations.map(motivation => <li key={motivation.id}>{motivation.motivation}</li>)}
                    </ul>
                    :
                    <p>You do not yet have any motivations submitted to list</p>
            }

            <BlessingForm />
            <h3>Blessings</h3>
            {
                blessings.length > 0 ?
                    <ul>
                        {blessings.map(blessing => <li key={blessing.id}>{blessing.blessing}</li>)}
                    </ul>
                    :
                    <p>You do not yet have any blessings submitted to list</p>
            }

        </div>
    );
}

export default MotoBlessing;