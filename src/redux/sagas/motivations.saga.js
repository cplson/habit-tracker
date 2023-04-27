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
        // updates the store
        yield put({type: 'SET_MOTIVATIONS', payload: motivations.data})
    }catch(err){
        console.log('there was an error getting motivations from the db', err);
    }
}

// makes a POST request to the server then
// GETS the updated motivations and updates the store
function* addMotivation(action){
    console.log(action.payload);
    try{
        yield axios.post('/api/motivations', action.payload);
        yield put({type: 'FETCH_MOTIVATIONS'});
    }catch(err){
        console.log('There was an error posting motivation to the db', err);
    }

}

function* editMotivation(action){
    try{
        yield axios.put(`api/motivations/${action.payload.id}`, action.payload)
        yield put({type: 'FETCH_MOTIVATIONS'})
    }catch(err){
        console.log(err);
    }
}
// parent generator function saga
function* motivationsSaga(){
    // listens for dispatch to get the current motivations from the db
    yield takeLatest('FETCH_MOTIVATIONS', fetchMotivations);

    // listens for dispatch to add a motivation to the db
    yield takeLatest('ADD_MOTIVATION', addMotivation);

    yield takeLatest('EDIT_MOTIVATION', editMotivation);
}

export default motivationsSaga;