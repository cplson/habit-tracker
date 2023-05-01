import { useSelector } from 'react-redux';

function NotesList({activeHabit}) {

    const habitLog = useSelector(store => store.habitLog)
    const logToDate = [];

    // convert log dates back to Date from string
    for (let log of habitLog) {
        if (log.notes != '') {
            logToDate.push({ date: log.date.split('T')[0], notes: log.notes });
        }
    }
    console.log(logToDate);
    return (
        <ul >
            {logToDate.map((log, i) =>
                <p key={i} className='note-list-note'>{log.date}: {log.notes}</p>
            )}
        </ul>
    );
}

export default NotesList;