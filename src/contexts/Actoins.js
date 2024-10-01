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

    isLoggedin : (isLoggedin) =>({
        type:'SET_LOGIN',
        payload:isLoggedin
    })

}

export default actionTypes;

