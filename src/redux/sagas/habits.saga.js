import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchHabits(action){
    // console.log('triggered fetchHabits()');
    try{
        const habits = yield axios.get('/api/habits');
        // console.log('recieved from db:', habits);
        yield put({type: 'SET_HABITS', payload: habits.data});
    }catch(err){
        console.log('error getting habits from server', err);
    }
}

function* addHabit(action){
    try{
        // axios POST
        // yield fetch habits
    }catch(err){
        console.log('there was an issue adding the habit to the db', err);
    }
}

function* habitsSaga(){
    // listens for dispatch to fetch the updated habits
    // from the db
    yield takeLatest('FETCH_HABITS', fetchHabits);

    // listens for dispatch to add
    // a new habit to the habits table
    yield takeLatest('ADD_HABIT', addHabit);
}

export default habitsSaga;