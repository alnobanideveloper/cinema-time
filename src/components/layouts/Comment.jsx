import { FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";
const Comment = ()=>{
    const rating = useSelector((state) => state.review.rating)
    const comment = useSelector((state) => state.review.comment)

        return (
        <div className="flex justify-between alert-info alert mb-3">
        <div>
           {comment}
        </div>

        <div className="flex shrink-0">
        <FaStar  className="mr-1 mt-0.5 bg-white-500"/>
        <div>{rating} / 5</div>
        </div>

    </div>
    )
}

export default Comment