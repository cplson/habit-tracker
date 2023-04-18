import Button from '@mui/material/Button';


function NotesList({ isPut }) {

    
    // sample data
    const sampleNotes = ['yay', 'sad', 'did great', 'ah shucks', 'gee willickers'];

    return (
        <ul>
            {sampleNotes.map((note, i) =>
                <li key={i} className='noteList'><Button>{note}</Button></li>
            )}
        </ul>
    );
}

export default NotesList;