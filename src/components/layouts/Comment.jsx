import { FaStar } from "react-icons/fa";
const Comment = ({comment , rating})=>{
    return (
        <div className="flex justify-between alert-info alert mb-3">
        <div className>
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