
const actionTypes = {
    setLoading: (loading) => ({
        type: 'SET_LOADING',
        payload: loading
    }),
    setSubmit: (comment, rating) => ({
        type: 'SET_SUBMIT',
        payload: {
            comment,
            rating,
        }
    }),
    setMovieDetails: (movie) => ({
        type: 'SET_MOVIE_DETAILS',
        payload: movie
    }),
    userCommented: (payload) => ({
        type: 'USER_COMMENTED',
        payload,
    }),
    setComment: (comment) => ({
        type: 'SET_COMMENT',
        payload: comment
    }),
    setRating: (rating) => ({
        type: "SET_RATING",
        payload: rating
    }),
    setSeries : (results) => ({
        type:'SET_SERIES',
        payload:results
    }),
    
    setMovies : (results) => ({
        type:'SET_MOVIES',
        payload:results
    }),

    setAdmin : (isAdmin)=>({
        type:'SET_ADMIN',
        payload:isAdmin
    }), 
}

export const setAlert = (msg , alertType) => dispatch => {
    dispatch({
        type: 'SET_ALERT',
        payload:  msg,
        alertType
    });

    setTimeout(() => {
        dispatch({ 
            type: 'REMOVE_ALERT' 
        });
    }, 3000);

};export default actionTypes;

