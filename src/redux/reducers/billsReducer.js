const billsReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_BILLS':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default billsReducer;