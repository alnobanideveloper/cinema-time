const initialState = {
    commentChange : '',
    comment:'',
    isComment : false,
    rating: '0',
    ratingChange: '0',
}

const reviewReducer =  (state = initialState , action) => {
    switch (action.type){
    case 'SET_COMMENT':
        return {
            ...state , 
            commentChange:action.payload
        }
    case 'USER_COMMENTED':
        return {
            ...state,
            isComment:action.payload
        }
    case 'SET_SUBMIT':
        return {
            ...state,
            comment:action.payload.comment,
            rating:action.payload.rating
        }
    case 'SET_RATING':
        return {
            ...state,
            ratingChange:action.payload
        }
    default:
        return state;
}}
export default reviewReducer;