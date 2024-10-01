import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";

const Stats = () => {
    return (
        <div className="flex justify-between h-screen flex-col">
            <Navbar />
            <div className="text-center text-xl text-bold">
                This is stat page
            </div>
            <Footer />
        </div>
    )
}
export default Stats;