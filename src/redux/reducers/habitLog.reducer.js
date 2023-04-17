const habitLogReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_LOG':
        return action.payload;
      case 'CLEAR_LOG':
        return [];
      default:
        return state;
    }
  };
  
  // habitLog will be on the redux state at:
  // state.habitLog
  export default habitLogReducer;