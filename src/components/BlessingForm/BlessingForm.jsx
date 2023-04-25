import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

function BlessingForm(){
    // declare local state for new blessing
    let [blessing, setBlessing] = useState('');

    // declare dispatch
    const dispatch = useDispatch();

    // function to update input state
    const handleBlessingChange = event => {
        // update blessing
        setBlessing(event.target.value);
        //console.log(blessing);
    }

    // runs on form submission
    const addBlessing = () => {
        // send dispatch to blessings saga
        dispatch({
            type: 'ADD_BLESSING',
            payload: {blessing}
        })
        // clear input field
        setBlessing('');
    }
    return (
        // new blessing form
        <form onSubmit={addBlessing}>
        <h4>Add a blessing</h4>
        <input
          type="text"
          placeholder="blessing"
          value={blessing}
          onChange={handleBlessingChange}
        />
        <button type="submit">Submit blessing</button>
      </form>
    )
}

export default BlessingForm;