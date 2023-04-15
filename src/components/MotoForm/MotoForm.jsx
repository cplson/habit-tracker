import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

function MotoForm(){
    // declare local state for new motivation
    let [motivation, setMotivation] = useState('');

    // declare dispatch
    const dispatch = useDispatch();

    // function to update input state
    const handleMotivationChange = event => {
        // update motivation
        setMotivation(event.target.value);
        // console.log(motivation);
    }

    // runs on form submission
    const addMotivation = () => {
        // send dispatch to motivations saga
        dispatch({
            type: 'ADD_MOTIVATION',
            payload: motivation
        })
        // clear input field
        setMotivation('');
    }
    return (
        // new motivation form
        <form onSubmit={addMotivation}>
        <h4>Add a motivation</h4>
        <input
          type="text"
          placeholder="motivation"
          value={motivation}
          onChange={handleMotivationChange}
        />
        <button type="submit">Submit Motivation</button>
      </form>
    )
}

export default MotoForm;