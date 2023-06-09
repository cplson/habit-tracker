import {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import PostForm from '../PostForm/PostForm';
import PutForm from '../PutForm/PutForm';

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

export default function PostModal({toggleVis, dateClicked, dateClickedString, isPut}) {
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
          {isPut ?
          <PutForm dateClickedString={dateClickedString} handleClose={handleClose}/>
          :
          <PostForm dateClicked={dateClicked} dateClickedString={dateClickedString} handleClose={handleClose}/>
        }
        </Box>
      </Modal>
    </div>
  );
}