import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// makes a get request to the server
// and sends a put dispatch to update the store
const fetchMotivations = (action) => {
    console.log('in fetchMotivations()');

    try{
        // yield GET axios request
        // yield put({type: 'SET_MOTIVATIONS})
    }catch(err){
        console.log('there was an error getting motivations from the db', err);
    }
}

// parent saga
function* motivationsSaga(){
    yield takeLatest('FETCH_MOTIVATIONS', fetchMotivations);
}

export default motivationsSaga;