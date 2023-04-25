const blessingsReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_BLESSINGS':
        return action.payload;
      default:
        return state;
    }
  };
  
  // blessings will be on the redux state at:
  // state.blessings
  export default blessingsReducer;