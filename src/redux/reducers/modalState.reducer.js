const modalStateReducer = (state = false, action) => {
    switch (action.type) {
      case 'SET_MODAL_TRUE':
        state= true
        return state;
      default:
        return state;
    }
  };
  
  // habitList will be on the redux state at:
  // state.habits
  export default modalStateReducer;