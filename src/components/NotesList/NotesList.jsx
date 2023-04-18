import Button from '@mui/material/Button';


function NotesList({ isPut, toggleVis }) {

    
    // sample data
    const sampleNotes = ['yay', 'sad', 'did great', 'ah shucks', 'gee willickers'];

    return (
        <ul>
            {sampleNotes.map((note, i) =>
                <li key={i} className='noteList'><Button onClick={() => toggleVis(false)}>{note}</Button></li>
            )}
        </ul>
    );
}

export default NotesList;