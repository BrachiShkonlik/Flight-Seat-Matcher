var inititalState = [];
//sessionStorage.setItem('state', '[]');

const passengerReducer = (state = inititalState, action) => {
//const passengerReducer = (state = sessionStorage ['state'], action) => {

    switch (action.type) {
        case 'SETPASSENGER': {
            debugger
            // state.push(action.payload);
            // action.payload.forEach(p => {
            //      state.push(p);
            // });
            state = action.payload;
            return state;
        }

        case 'DELETEPASSENGER': {
            state = state.filter(item => item.flightCode === action.payload);
            return state;
        }

        default:
            return state;
    }
    
};
export default passengerReducer;
