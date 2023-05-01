import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchHabits(){
    // console.log('triggered fetchHabits()');
    try{
        const habits = yield axios.get('/api/habits');
        // console.log('recieved from db:', habits);
        yield put({type: 'SET_HABITS', payload: habits.data});
    }catch(err){
        console.log('error getting habits from server', err);
    }
}

//TO DO: POST addHabit
function* addHabit(action){
    try{
        // axios POST
        yield axios.post('/api/habits', action.payload);
        // yield fetch habits
        yield put({type: 'FETCH_HABITS'})
    }catch(err){
        console.log('there was an issue adding the habit to the db', err);
    }
}

function* deleteHabit(action){
    console.log('triggered deleteHabit()', action.payload);
    try{
        // delete habit logs related to this habit and update store
        yield axios.delete(`/api/habits/${action.payload.id}`)
        yield put({type: 'FETCH_LOG'})
        // delete habit and update store
        yield axios.delete(`/api/habits/${action.payload.id}`);
        yield put({type: 'FETCH_HABITS'});
        
    }catch(err){
        console.log('there was an issue while trying to delete habit from db', err);
    }
}

function* habitsSaga(){
    // listens for dispatch to fetch the updated habits
    // from the db
    yield takeLatest('FETCH_HABITS', fetchHabits);

    // listens for dispatch to add
    // a new habit to the habits table
    yield takeLatest('ADD_HABIT', addHabit);

    // listens for dispatch to delete
    // a habit from the habits table
    yield takeLatest('DELETE_HABIT', deleteHabit);
}

export default habitsSaga;