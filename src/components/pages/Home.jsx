import Navbar from "../layouts/Navbar"
import Movies from "./MoviesPage"
import Footer from "../layouts/Footer"
import Series from "./SeriesPage"
import { useLocation  , useNavigate} from "react-router-dom"
import { useEffect } from "react"

const Home = ()=>{

    const type = useLocation().pathname
    const navigate = useNavigate();
    useEffect(()=>{
        localStorage.getItem('isLogIn') === 'false' && navigate('/');
    })
    return(
        
        <div className="flex flex-col justify-between h-screen">
        <Navbar />
        {type === '/movies' &&  <Movies/> }
        {type === '/series' && <Series/>}
        <Footer className="footer "/>
        </ div>
    )
}
export default Home
