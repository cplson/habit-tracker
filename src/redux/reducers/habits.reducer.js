const habitsReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_HABITS':
        return action.payload;
      default:
        return state;
    }
  };
  
  // habitList will be on the redux state at:
  // state.habits
  export default habitsReducer;