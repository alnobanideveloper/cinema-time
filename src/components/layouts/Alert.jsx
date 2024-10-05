import { FiAlertTriangle } from "react-icons/fi";
import { useSelector } from "react-redux";
const Alert = ()=>{
    const message = useSelector(state => state.alert.msg)
    console.log(message);
    return (
    <div className="text-red-400 flex flex-row gap-2 items-center">
        <FiAlertTriangle />
        <div>{message}</div>
    </div>
    )
}
export default Alert;