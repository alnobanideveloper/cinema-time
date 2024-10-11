import Spinner from "../layouts/Spinner"
import Card from "../layouts/card";
import useFetch from "../../customHooks/useFetch";

const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = process.env.REACT_APP_API_URL;


const Movies = ()=>{
    const {data , loading , error} =  useFetch(`${API_URL}movie/popular?api_key=${API_KEY}`);

if(loading)
    return <Spinner />

else{
    return(
        <div className="flex flex-col items-center">
        <h1 className="popular-movies text-5xl text-center mb-10 text-white">Popular Movies</h1>
        <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cold-3 md:grid-cols-2 mb-8 gap-20">
           { data.map((movie) => <Card key={movie.id} movie={movie} type="movie"/>)}
       </div>
        </div>
    )
}
}
export default Movies;