import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

function NotesList() {

    const habitLog = useSelector(store => store.habitLog)
    const logToDate = [];

    // convert log dates back to Date from string
    for (let log of habitLog){
        if(log.notes != ''){
            logToDate.push({date: log.date.split('T')[0], notes: log.notes});
        }
    }
    console.log(logToDate);
    return (
        <ul>
            {logToDate.map((log, i) =>
                <p key={i} className='noteList'>{log.date}: {log.notes}</p>
            )}
        </ul>
    );
}

export default NotesList;