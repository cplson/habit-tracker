import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import MotoForm  from '../MotoForm/MotoForm';
import BlessingForm from '../BlessingForm/BlessingForm';

function MotoBlessing(){
// get user data from the store
const user = useSelector(store => store.user);

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