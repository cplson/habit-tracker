import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchHabitLog(action){
    // console.log('triggered fetchHabitLog()');
    try{
        const habitLog = yield axios.get('/api/habitLog');
        // console.log('recieved from db:', habitLog);
        yield put({type: 'SET_LOG', payload: habitLog.data});
    }catch(err){
        console.log('error getting habitLog from server', err);
    }
}

function* addToLog(action){
    try{
        // axios POST
        // yield fetch habits
    }catch(err){
        console.log('there was an issue adding date to log to the db', err);
    }
}

function* habitLogSaga(){
    // listens for dispatch to fetch the updated habit log
    // from the db
    yield takeLatest('FETCH_LOG', fetchHabitLog);

    // listens for dispatch to add
    // a new date to the habit log
    yield takeLatest('ADD_TO_LOG', addToLog);
}

export default habitLogSaga;