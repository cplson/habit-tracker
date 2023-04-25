import { useSelector, useDispatch } from 'react-redux';
import { useState} from 'react';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextareaAutosize from '@mui/base/TextareaAutosize';




function PutForm({ dateClickedString, handleClose }) {

    // store
    const editLog = useSelector(store => store.editLog);
    
    // dispatch
    const dispatch = useDispatch();

    const handleSubmit = () => {
            event.preventDefault();

            dispatch({
                type: 'EDIT_LOG_ENTRY',
                payload: editLog
            })

            handleClose();
    }

    const handleChange = (event) => {
        dispatch({
            type: 'EDIT_LOG_ONCHANGE',
            payload: {property: 'status', value: event.target.value}
        })
    };
    const handleText = event => {
        dispatch({
            type: 'EDIT_LOG_ONCHANGE',
            payload: {property: 'notes', value: event.target.value}
        })
    }
    return (
        <div>
            <h4>{dateClickedString}</h4>
            <form onSubmit={handleSubmit}>
                <FormControl fullWidth>
                    <InputLabel id="statusLabel">{editLog.status}</InputLabel>
                    <Select
                        labelId="statusLabel"
                        id="dateFormStatus"
                        value={editLog.status}
                        label="status"
                        onChange={handleChange}
                    >
                        <MenuItem value={'default'}>Default</MenuItem>
                        <MenuItem value={'successful'}>Successful</MenuItem>
                        <MenuItem value={'unsuccessful'}>Unsuccessful</MenuItem>
                    </Select>
                    <TextareaAutosize fullWidth
                        aria-label="empty textarea"
                        value={editLog.notes}
                        placeholder="Notes"
                        onChange={handleText}
                    />
                    <Button type='submit'>Submit</Button>
                </FormControl>
            </form>
        </div>
    )
}

export default PutForm;