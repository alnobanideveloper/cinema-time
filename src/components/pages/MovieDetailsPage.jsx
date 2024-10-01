import { useEffect } from "react"
import { useLocation } from "react-router-dom"
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
    const rating = useSelector((state) => state.review.rating)
    const comment = useSelector((state) => state.review.comment)
    const id = useLocation().pathname.split('/')[2]

    useEffect(() => {
        !isLoggedin && navigate('/') //return to the login page if the user didnt loggin
        fetchDetails();
        fetchLocalStorage();
    }, [])


    const fetchDetails = async () => {

        dispatch(actionTypes.setLoading(true));
        let data;
        type === "Movies" ?
            data = await fetch(`${API_URL}movie/${id}?api_key=${API_KEY}`) :
            data = await fetch(`${API_URL}tv/${id}?api_key=${API_KEY}`);

        const movie = await data.json();

        dispatch(actionTypes.setMovieDetails(movie));

        dispatch(actionTypes.setLoading(false))

    }
    const fetchLocalStorage = () => {
        const comment = localStorage.getItem(`comment_${type}_${id}`)
        const rating = localStorage.getItem(`rating_${type}_${id}`)

        if (comment && comment !== '') {
            dispatch(actionTypes.userCommented(true))
            dispatch(actionTypes.setSubmit(comment, rating));
        }

        else
            dispatch(actionTypes.userCommented(false))
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        if (commentChange === '') {
            alert('comment cant be empty')
            return;
        }

        if (ratingChange === '0') {
            alert('please rate the movie')
            return;
        }

        localStorage.setItem(`comment_${type}_${id}`, commentChange);
        localStorage.setItem(`rating_${type}_${id}`, ratingChange);

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
                                        {type === "Movies" ? movie.title : movie.name}
                                    </h2>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-2">
                            <div className="mb-6">
                                <h1 className="text-4xl card-title mb-5 font-bold">
                                    {type === "Movies" ? movie.title : movie.name}
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
                            {isComment && <Comment comment={comment} rating={rating} />}
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