import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// makes a get request to the server
// and sends a put dispatch to update the store
function* fetchMotivations(action){
    console.log('in fetchMotivations()');

    try{
        // the config includes credentials which
        // allow the server session to recognize the user
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          };
        // yield GET axios request
        const motivations = yield axios.get('/api/motivations', config)
        console.log(motivations.data);
        yield put({type: 'SET_MOTIVATIONS', payload: motivations.data})
    }catch(err){
        console.log('there was an error getting motivations from the db', err);
    }
}

// parent generator function saga
function* motivationsSaga(){
    yield takeLatest('FETCH_MOTIVATIONS', fetchMotivations);
}

export default motivationsSaga;