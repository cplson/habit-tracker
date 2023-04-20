const editLogReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_EDIT_LOG':
        return action.payload;
        case 'EDIT_LOG_ONCHANGE':
            return {
                // return the whole state, with the change of the edited property
                ...state,
                [action.payload.property]: action.payload.value
            }
            case 'EDIT_CLEAR':
                return {};
      default:
        return state;
    }
  };
  
  // habitLog will be on the redux state at:
  // state.habitLog
  export default editLogReducer;