import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import MbModal from '../MbModal/MbModal';
import EditIcon from '@mui/icons-material/Edit';


function Blessings() {

    // local state
    let [visibility, toggleVis] = useState(false),
        [isPost, setRoute] = useState(true),
        [isMotivation, setType] = useState(false),
        [thisBlessing, setBlessing] = useState({});

    const blessings = useSelector(store => store.blessings)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'FETCH_BLESSINGS' })
    }, [])

    const postBlessing = () => {
        toggleVis(true);
        setRoute(true);
    }

    return (
        <>
            <h3>Blessings</h3>
            <ul>
                {blessings.map(blessing =>
                    <li key={blessing.id} className='blessing-item'>
                        <Button onClick={event => {
                            toggleVis(true);
                            setRoute(false);
                            console.log('blessing is', blessing);
                            setBlessing(blessing)
                        }}
                            className="edit-icon-button" >
                            <EditIcon fontSize='small' />
                        </Button>{blessing.blessing}
                    </li>)}
            </ul>
            <div className='button-group'>
                <Button variant='contained' sx={{ backgroundColor: '#279AF1' }}
                    onClick={postBlessing}>Add</Button>
                {/* <Button variant='outlined' className='reflect-button' sx={{ color: '#279AF1' }}>Reflect</Button> */}
            </div>
            {visibility && <MbModal
                toggleVis={toggleVis} isMotivation={isMotivation} isPost={isPost} thisBlessing={thisBlessing} setBlessing={setBlessing} />}
        </>
    )
}

export default Blessings;