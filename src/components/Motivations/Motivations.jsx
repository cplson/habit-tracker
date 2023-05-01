import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import MbModal from '../MbModal/MbModal';
import EditIcon from '@mui/icons-material/Edit';

function Motivations() {

    // local state
    let [visibility, toggleVis] = useState(false),
        [isPost, setRoute] = useState(true),
        [isMotivation, setType] = useState(true),
        [thisMotivation, setMotivation] = useState({});

    const motivations = useSelector(store => store.motivations)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'FETCH_MOTIVATIONS' })
    }, [])

    const postMotivation = () => {
        toggleVis(true);
        setRoute(true);
    }
    return (
        <>
            <h3>Motivations</h3>
            <ul>
                {motivations.map(motivation =>
                    <li key={motivation.id} className='motivation-item'>
                        <Button onClick={event => {
                            toggleVis(true);
                            setRoute(false);
                            console.log('motivation is', motivation)
                            setMotivation(motivation)
                        }}
                            className="edit-icon-button" >
                                <EditIcon fontSize='small' /></Button>
                        {motivation.motivation}</li>)}
            </ul>
            <div className='button-group'>
                <Button variant='contained' sx={{ backgroundColor: '#279AF1' }}
                    onClick={postMotivation}>Add</Button>
                {/* <Button variant='outlined' className='reflect-button' sx={{ color: '#279AF1' }}>Reflect</Button> */}
            </div>
            {visibility && <MbModal
                toggleVis={toggleVis} isMotivation={isMotivation} isPost={isPost} thisMotivation={thisMotivation} setMotivation={setMotivation}/>}
        </>
    )
}

export default Motivations;