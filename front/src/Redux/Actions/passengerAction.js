export const setPassenger = (data) => {
    
    return{
        type:"SETPASSENGER",
        payload: data,
    };
};

export const deletePassenger = (data) => {
    
    return{
        type:"DELETEPASSENGER",
        payload: data,
    };
};