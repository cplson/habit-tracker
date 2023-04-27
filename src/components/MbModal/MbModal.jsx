import {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import MbPost from '../MbPost/MbPost';
import MbPut from '../MbPut/MbPut';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function MbModal({toggleVis, isMotivation, isPost, thisBlessing, thisMotivation}) {
  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    toggleVis(false);
  }

    return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {isPost ? 
            <MbPost toggleVis={toggleVis} isMotivation={isMotivation}/> : 
            <MbPut toggleVis={toggleVis} isMotivation={isMotivation} thisBlessing={thisBlessing} thisMotivation={thisMotivation}/>}
        </Box>
      </Modal>
    </div>
    );
}