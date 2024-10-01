import { useEffect } from "react";
import Spinner from "../layouts/Spinner"
import {useSelector , useDispatch} from 'react-redux'
import Card from "../layouts/card";
import actionTypes from '../../contexts/Actoins'

const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = process.env.REACT_APP_API_URL;


const Movies = ()=>{
    const dispatch = useDispatch();
    const loading = useSelector((state)=>state.movie.loading);
    const movies = useSelector((state)=>state.movie.movies);

    useEffect(()=>{
        fetchMovies();
    } , [])

    const fetchMovies = async () => {
        dispatch(actionTypes.setLoading(true));

        const response = await fetch(`${API_URL}movie/popular?api_key=${API_KEY}`);
        const {results} = await response.json();

        dispatch(actionTypes.setLoading(false));
        dispatch(actionTypes.setMovies(results)); 
    }
if(loading)
    return <Spinner />

else
    return(
        <div className="flex flex-col items-center">
        <h1 className="popular-movies text-5xl text-center mb-10 text-white">Popular Movies</h1>
        <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cold-3 md:grid-cols-2 mb-8 gap-20">
           { movies.map((movie) => <Card key={movie.id} movie={movie} type="movie"/>)}
       </div>
        </div>
    )
}
export default Movies;