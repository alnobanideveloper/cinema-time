import { MdMovie } from "react-icons/md";
import { Link } from 'react-router-dom'
import { useLocation , useNavigate } from "react-router-dom";
import { logout } from "../../firebase";
const Navbar = ({ title = "CinemaTime" }) => {
    const type = useLocation().pathname;
    const navigate = useNavigate();
    const email = localStorage.email
    
    let isAdmin = false;
    if(email === "admin@gmail.com")
       isAdmin = true;

    const handleSignOut =  async ()=>{
        await logout();
        navigate('/');
    }
    return (
        <nav className="navbar mb-12 shadow-la bg-neutral text-white">
            <div className="container mx-auto">
                <div className="flex-none px-2 mx-2">
                    <MdMovie className='inline pr-2 text-3xl' />
                    <Link to='/movies' className='text-lg font-bold align-middle'>{title}</Link>
                </div>
            </div>
            <Link to='/movies' className={`btn btn-sm rounded-btn ${type === '/movies' ? 'btn-primary' : 'btn-ghost'}`}>Movies</Link>
            <Link to='/series' className={`btn btn-sm rounded-btn ${type === '/series' ? 'btn-primary' : 'btn-ghost'}`}>Series</Link>
            {
                isAdmin && <Link to='/stats' className={`btn btn-sm rounded-btn ${type === '/stats' ? 'btn-primary' : 'btn-ghost'}`}>Sats</Link>
            }
            <div className="btn btn-sm btn-ghost rounded-btn" onClick={handleSignOut}>Sign Up</div>
        </nav>
    )
}
export default Navbar;