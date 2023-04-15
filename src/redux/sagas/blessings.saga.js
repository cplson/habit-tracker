import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// makes a get request to the server
// and sends a put dispatch to update the store
function* fetchBlessings(action){
    console.log('in fetchBlessings()');

    try{
        // the config includes credentials which
        // allow the server session to recognize the user
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          };
        // yield GET axios request
        const blessings = yield axios.get('/api/blessings', config)
        console.log(blessings.data);
        yield put({type: 'SET_BLESSINGS', payload: blessings.data})
    }catch(err){
        console.log('there was an error getting motivations from the db', err);
    }
}

// parent generator function saga
function* blessingsSaga(){
    yield takeLatest('FETCH_BLESSINGS', fetchBlessings);
}

export default blessingsSaga;