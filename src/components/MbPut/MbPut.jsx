import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

function MbPut({toggleVis, isMotivation, thisMotivation, thisBlessing}){
    const dispatch = useDispatch();

    let [blessing, setBlessing]= useState(thisBlessing ? thisBlessing.blessing : '');
    let [motivation, setMotivation] = useState(thisMotivation ? thisMotivation.motivation : '');
    const handleChange = event => {
        console.log(blessing);
        if(isMotivation){
            setMotivation(event.target.value)
        }
        else{
            setBlessing(event.target.value);
        }
    }

    const handleSubmit = event => {
        event.preventDefault();

        if(isMotivation){
            dispatch({type: 'EDIT_MOTIVATION', payload: {id: thisMotivation.id, motivation: motivation}})
        }
        else{
            dispatch({type: 'EDIT_BLESSING', payload: {id: thisBlessing.id, blessing: blessing}})
        }
        toggleVis(false);
    }
    return (
        <form onSubmit={handleSubmit}>
                <FormControl fullWidth>
                    <TextField label={isMotivation ? 'motivation' : 'blessing'} value={isMotivation ? motivation : blessing}
                        onChange={handleChange}></TextField>
                    <Button type='submit'>Submit</Button>
                </FormControl>
        </form>
    )
}

export default MbPut;