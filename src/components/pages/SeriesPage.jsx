import { useEffect } from "react";
import Spinner from "../layouts/Spinner"
import {useSelector , useDispatch} from 'react-redux'
import Card from "../layouts/card";
import useFetch from "../../customHooks/useFetch";
import actionTypes from '../../contexts/Actoins'

const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = process.env.REACT_APP_API_URL;

const Series = ()=>{
const {data , loading , error} = useFetch(`${API_URL}tv/popular?api_key=${API_KEY}`);

if(loading)
    return <Spinner />
else
    return(
        <div className="flex flex-col items-center">
        <h1 className="popular-movies text-5xl text-center mb-10 text-white">Popular Series</h1>
        <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cold-3 md:grid-cols-2 mb-8 gap-20">
           { data.map((show) => <Card key={show.id} movie={show} type="serie"/>)}
       </div>
        </div>
    )
}
export default Series;