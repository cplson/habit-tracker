import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button';


function DateForm({ isPut}){

    // store
    const habitLog = useSelector(store => store.habitLog);
    
    const handleSubmit = () => {
        // if(isPut){
        //     // PUT dispatch
        // }
        // else(
        //     // POST dispatch
        // )
        
    }
    
    return(
        <form onSubmit={handleSubmit}>
            <label htmlFor="date"></label>
    <Button type='submit'>Submit</Button>;
        </form>
    )
}

export default DateForm;