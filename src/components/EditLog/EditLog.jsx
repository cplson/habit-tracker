import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

function EditLog(){
    // local state
    let [id, setId] = useState(0),
        [status, setStatus] = useState(''),
        [notes, setNotes] = useState('');

    // declare dispatch
    const dispatch = useDispatch();

    const handleSubmit = () => {
        console.log('trigger handleSubmit');
        dispatch({
            type: 'EDIT_LOG_ENTRY',
            payload: {id, status, notes}
        });

        // clear form
        setId(0);
        setStatus('');
        setNotes('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="id">
                        id:
                        <input
                            type="number"
                            name="id"
                            value={id}
                            required
                            onChange={(event) => setId(event.target.value)}
                        />
                    </label>
                    <label htmlFor="status">
                        status:
                        <input
                            type="text"
                            name="status"
                            value={status}
                            required
                            onChange={(event) => setStatus(event.target.value)}
                        />
                    </label>
                    <label htmlFor="notes">
                        notes:
                        <input
                            type="text"
                            name="notes"
                            value={notes}
                            required
                            onChange={(event) => setNotes(event.target.value)}
                        />
                    </label>
                    <button type='submit'>Submit</button>
        </form>
    );
}

export default EditLog;