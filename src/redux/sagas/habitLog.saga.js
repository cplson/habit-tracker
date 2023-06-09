import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchHabitLog(action){
    // console.log('triggered fetchHabitLog()', action.payload);
    try{
        const habitLog = yield axios.get(`/api/habit-log`);
        // console.log('habitLog in fetchHabitLog:', habitLog);
        // console.log('recieved from db:', habitLog);
        yield put({type: 'SET_LOG', payload: habitLog.data});
    }catch(err){
        console.log('error getting habitLog from server', err);
    }
}

function* addToLog(action){
    // console.log('triggered addToLog()', action.payload);
    try{
        // axios POST
        yield axios.post('/api/habit-log', action.payload);
        // yield fetch log
        yield put({type: 'FETCH_LOG'});
    }catch(err){
        console.log('there was an issue adding date to log to the db', err);
    }
}

function* editLogEntry(action){
    console.log('triggered editLogEntry()', action.payload);
    try{
        // PUT request
        yield axios.put(`/api/habit-log/${action.payload.id}`, action.payload)
        // put dispatch
        yield put({type: 'FETCH_LOG'});
        // clear editLog
        yield put({ type: 'EDIT_CLEAR'});
    }catch(err){
        console.log('error in editLogEntry() in habitLog saga', err);
    }
}
function* habitLogSaga(){
    // listens for dispatch to fetch the updated habit log
    // from the db
    yield takeLatest('FETCH_LOG', fetchHabitLog);

    // listens for dispatch to add
    // a new date to the habit log
    yield takeLatest('ADD_TO_LOG', addToLog);

    // listens for dispatch to edit
    // an entry in the habit log
    yield takeLatest('EDIT_LOG_ENTRY', editLogEntry)
}

export default habitLogSaga;