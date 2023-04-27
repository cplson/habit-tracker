import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

function MbPost({toggleVis, isMotivation}){
    const dispatch = useDispatch();

    let [postInput, setPostInput] = useState('');
    const handleSubmit = event => {
    event.preventDefault();
    
    console.log('isMotivation is false', isMotivation);

    if(isMotivation){
        dispatch({type: 'ADD_MOTIVATION', payload: {motivation: postInput}})
    }
    else{
        dispatch({type: 'ADD_BLESSING', payload: {blessing: postInput}})
    }
    toggleVis(false);
    }

    const handleChange = event => {
        setPostInput(event.target.value);
        console.log(postInput);
    }
    return(
        <form onSubmit={handleSubmit}>
                <FormControl fullWidth>
                    <TextField label={isMotivation ? 'motivation' : 'blessing'} value={postInput}
                        onChange={handleChange}></TextField>
                    <Button type='submit'>Submit</Button>
                </FormControl>
        </form>
    )
}

export default MbPost;