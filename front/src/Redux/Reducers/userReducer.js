var inititalState = [];



const userReducer = (state = inititalState , action ) => {

    switch(action.type) {
        case 'SETUSER':
            
            state = action.payload;
            return state;
    }
    return state;
};
export default userReducer;
