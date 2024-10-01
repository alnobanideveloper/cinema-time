import { useEffect } from "react";
import Spinner from "../layouts/Spinner"
import {useSelector , useDispatch} from 'react-redux'
import Card from "../layouts/card";
import actionTypes from '../../contexts/Actoins'


const Series = ()=>{
    const dispatch = useDispatch();
    const loading = useSelector((state)=>state.movie.loading)
    const series = useSelector((state)=>state.movie.series)
    const API_KEY = process.env.REACT_APP_API_KEY;
    const API_URL = process.env.REACT_APP_API_URL;

    useEffect(()=>{
        fetchShows();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    } , [])

    const fetchShows = async () => {
        dispatch(actionTypes.setLoading(true));

        const response = await fetch(`${API_URL}tv/popular?api_key=${API_KEY}`);
        const {results} = await response.json();

        dispatch(actionTypes.setLoading(false));
        dispatch(actionTypes.setSeries(results))   ;
    }
if(loading)
    return <Spinner />
else
    return(
        <div className="flex flex-col items-center">
        <h1 className="popular-movies text-5xl text-center mb-10 text-white">Popular Series</h1>
        <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cold-3 md:grid-cols-2 mb-8 gap-20">
           { series.map((show) => <Card key={show.id} movie={show} type="serie"/>)}
       </div>
        </div>
    )
}
export default Series;