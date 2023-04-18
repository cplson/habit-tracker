import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/user', config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_USER', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* setActiveHabit(action){
  console.log('inside setActiveHabit()', action.payload);
  try{
    yield axios.put(`/api/user/${action.payload.id}`)
    yield put({type: 'FETCH_USER'});
  }catch(err){
    console.log('error changing active habit', err);
  }
}
function* userSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
  // sets the active habit for the user
  yield takeLatest('SET_ACTIVE_HABIT', setActiveHabit);
}

export default userSaga;
