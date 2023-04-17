import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function HabitForm() {
    // local state
    let [description, setDescription] = useState('');
    
    // declare dispatch
    const dispatch = useDispatch();

    const handleSubmit = event => {
        dispatch({
            type: 'ADD_HABIT',
            payload: {description}
        })
        setDescription('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="description">
                    Username:
                    <input
                        type="text"
                        name="description"
                        value={description}
                        required
                        onChange={(event) => setDescription(event.target.value)}
                    />
                </label>
                <button type="submit">Submit</button>
            </div>
        </form>
    );
}

export default HabitForm;