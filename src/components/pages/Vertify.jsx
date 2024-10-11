import { Link } from "react-router-dom";
import { useState } from "react";
import  { vertifyEmail } from '../../firebase'
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged , reload } from "firebase/auth";
import { auth } from "../../firebase";

const Vertification = ()=>{
    const [isVerified, setIsVerified] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Listen for auth state changes
        localStorage.setItem('isLogIn' , false);
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // Reload the user to get the latest emailVerified status
                reload(user).then(() => {
                    if (user.emailVerified) {
                      localStorage.setItem('isLogIn' , true);
                        setIsVerified(true);
                        navigate("/movies"); // Redirect to home if email is verified
                    }
                });
            }
        });

        return () => unsubscribe();
    });

  const email = localStorage.getItem('email');
    const resendEmail = (e)=>{
      try{
        e.preventDefault();

        vertifyEmail()

      }catch(Error){
        alert(Error.message)
      }
    }
    return (
        <>
          <div className="login-page min-h-screen flex flex-col justify-center items-center">
            <form className=" bg-gray-900 p-8 rounded-lg shadow-lg " onSubmit={resendEmail}>
              <h1 className="login-title text-4xl font-bold text-primary mb-3 text-center">Please vertify your email</h1>
    
              <p className="text-center text-gray-300 mt-6">
                You're almost there!! We sent an email to 
              </p>
              <p className="text-center text-gray-200 mt-1 mb-6 font-bold  underline">{email}</p>
          
              <button type="submit" className="btn btn-primary w-full p-3">Resend Vertification Email</button>
    
              <p className="mt-4 text-center text-sm text-gray-400">
                Back To Sign in? <Link to="/" className="text-primary hover:underline">Sign In</Link>
              </p>
            
            </form>
          </div>
        </>
      );
    
}
export default Vertification