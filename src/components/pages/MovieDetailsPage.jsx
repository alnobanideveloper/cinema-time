import { useEffect,useState } from "react"
import { useLocation } from "react-router-dom"
import { addComment , updateComment  , fetchUserComments} from "../../firebase";
import { Link } from "react-router-dom";
import Spinner from "../layouts/Spinner";
import { useSelector, useDispatch } from 'react-redux'
import Navbar from "../layouts/Navbar";
import Comment from "../layouts/Comment";
import Footer from "../layouts/Footer";
import actionTypes from '../../contexts/Actoins'
import { useNavigate } from "react-router-dom";

const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = process.env.REACT_APP_API_URL;


const MovieDetails = ({ type }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize the hook
    const isLoggedin = useSelector(state => state.movie.isLoggedin)
    const loading = useSelector((state) => state.movie.loading)
    const movie = useSelector((state) => state.movie.movie)
    const commentChange = useSelector((state) => state.review.commentChange)
    const isComment = useSelector((state) => state.review.isComment)
    const ratingChange = useSelector((state) => state.review.ratingChange)
    const id = useLocation().pathname.split('/')[2]
    const [commentId , setCommentId] = useState(null);

    useEffect(() => {
        !isLoggedin && navigate('/') //return to the login page if the user didnt loggin
        fetchInfo();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchInfo = async ()=>{
        dispatch(actionTypes.setLoading(true));

        await fetchMovieComment();
        await fetchDetails();

        dispatch(actionTypes.setLoading(false));

    }
    
    const fetchMovieComment = async ()=>{
        const comments = await fetchUserComments();
        const filteredComments = comments.filter(comment=>comment.movieId === id);

        if(filteredComments.length > 0){
            const {comment , rating , id} = filteredComments[0];
            dispatch(actionTypes.userCommented(true))
            dispatch(actionTypes.setSubmit(comment,rating));
            setCommentId(id)
        }
        else
            dispatch(actionTypes.userCommented(false))

    }
  
    const fetchDetails = async () => {
        let data;
        type === "movies" ?
            data = await fetch(`${API_URL}movie/${id}?api_key=${API_KEY}`) :
            data = await fetch(`${API_URL}tv/${id}?api_key=${API_KEY}`);

        const movie = await data.json();

        dispatch(actionTypes.setMovieDetails(movie));
    }



    const handleSubmit = async (e) => {
        e.preventDefault();

        if (commentChange === '') {
            alert('comment cant be empty')
            return;
        }

        if (ratingChange === '0') {
            alert('please rate the movie')
            return;
        }

        isComment ? 
        await updateComment(commentChange , ratingChange  , commentId ): 
        setCommentId( await addComment(commentChange , ratingChange , type,id));
        
        dispatch(actionTypes.userCommented(true))
        dispatch(actionTypes.setSubmit(commentChange, ratingChange));
        dispatch(actionTypes.setComment('')); //to remove the text from the input
    }

    const handleChange = (value) => {
        dispatch(actionTypes.setComment(value));
    }

    const changeRating = (value) => {
        dispatch(actionTypes.setRating(value));
    }

    if (loading)
        return <Spinner />

    else
        return (
            <div className="flex flex-col justify-between h-screen ">
                <Navbar />
                <div className="w-full mx-auto lg:w-10/12 text-white sm:px-4 ">
                    <div className="mb-4">
                        <Link to={`/${type.toLowerCase()}`} className="btn btn-ghost">
                            {`Back To ${type}`}
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 mb-8 md:gap-8 md:px-4">
                        <div className="custom-card-image mb-6 md:mb-0">
                            <div className="rounded-lg shadow-xl card image-full">
                                <figure>
                                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="" />
                                </figure>

                                <div className="card-body justify-end">
                                    <h2 className="card-title mb-0 text-white">
                                        {type === "movies" ? movie.title : movie.name}
                                    </h2>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-2">
                            <div className="mb-6">
                                <h1 className="text-4xl card-title mb-5 font-bold">
                                    {type === "movies" ? movie.title : movie.name}
                                </h1>

                                <div className="mb-4 flex flex-wrap gap-2">
                                    {movie.genres && movie.genres.length > 0 && movie.genres.map((genre) => (
                                        <span className="ml-2 mr-1 badge badge-success text-sm px-4 py-1 rounded-full" key={genre.id}>
                                            {genre.name}
                                        </span>
                                    ))}
                                </div>
                                <p>{movie.overview}</p>
                                <div className="mt-4 card-actions">
                                    <a
                                        href={movie.homepage}
                                        target="_blank"
                                        className="btn btn-outline text-white"
                                        rel="noreferrer">
                                        Go To Official Website
                                    </a>
                                </div>
                            </div>
                            <div className="w-full rounded-lg shadow-md-base-100 stats">
                            </div>
                            {isComment && <Comment key={commentId}/>}
                            <form className="flex flex-col" onSubmit={handleSubmit}>
                                <div className="flex flex-col justify-center gap-2">

                                    <textarea
                                        className="textarea textarea-info"
                                        placeholder="Comment"
                                        value={commentChange}
                                        onChange={(e) => { handleChange(e.target.value) }}>
                                    </textarea>

                                    <div className="rating flex">
                                        <label htmlFor="rating-2" className="mr-2 label">Rating : </label>
                                        <input type="radio" name="rating-2" defaultChecked className="hidden" value={0} />
                                        <input type="radio" name="rating-2" className="self-center mask mask-star-2 bg-orange-400" value={1} onClick={(e) => changeRating(e.target.value)} />
                                        <input type="radio" name="rating-2" className="self-center mask mask-star-2 bg-orange-400" value={2} onClick={(e) => changeRating(e.target.value)} />
                                        <input type="radio" name="rating-2" className="self-center mask mask-star-2 bg-orange-400" value={3} onClick={(e) => changeRating(e.target.value)} />
                                        <input type="radio" name="rating-2" className="self-center mask mask-star-2 bg-orange-400" value={4} onClick={(e) => changeRating(e.target.value)} />
                                        <input type="radio" name="rating-2" className="self-center mask mask-star-2 bg-orange-400" value={5} onClick={(e) => changeRating(e.target.value)} />
                                    </div>
                                    <input type="submit" className="btn btn-ghost" value="submit" />
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
}
export default MovieDetails