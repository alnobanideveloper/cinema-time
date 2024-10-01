const initialState = {
loading:false,
isLoggedin:true,
movies:[],
series:[],
movie:{},
}

const reducer = (state = initialState, action)=>{
    switch (action.type) {
        case 'SET_MOVIES':
            return{
                ...state,
                movies:action.payload,
            }
        case 'SET_SERIES':
            return {
                ...state,
                series:action.payload
            }
        case 'SET_LOADING':
            return {
                ...state , 
                loading:action.payload
            }
        case 'SET_MOVIE_DETAILS':
            return { 
                ...state , 
                movie:action.payload
            }
        case 'SET_LOGIN':
            return{
                ...state,
                isLoggedin:action.payload
            }
        default:
            return state;
    }
}

export default reducer;