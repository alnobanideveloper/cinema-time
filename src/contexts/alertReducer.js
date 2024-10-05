const initialState ={
    msg : null,
    alertType : 0
};
const alertReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ALERT':
            return {
            ...state,
            msg : action.payload,
            alertType:action.alertType
            };

        case 'REMOVE_ALERT':
            return {
                ...state,
                msg:null,
                alertType:0
            };
        default:
            return state;
    }
};

export default alertReducer;