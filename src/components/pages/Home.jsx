import Navbar from "../layouts/Navbar"
import Movies from "./MoviesPage"
import Footer from "../layouts/Footer"
import Series from "./SeriesPage"
import { useLocation } from "react-router-dom"

const Home = ()=>{

    const type = useLocation().pathname
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
