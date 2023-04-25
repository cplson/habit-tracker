const motivationsReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_MOTIVATIONS':
        return action.payload;
      default:
        return state;
    }
  };
  
  // motivations will be on the redux state at:
  // state.motivations
  export default motivationsReducer;