import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import actionTypes from "../../contexts/Actoins";

const Login = () => {
  useEffect(()=>{
    dispatch(actionTypes.isLoggedin(false));
  },[])
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize the hook


  const [email , setEmail] = useState('') 
  const [password , setPassword] = useState('') 

  const handleSubmit = (e)=>{
    e.preventDefault();

    localStorage.clear();
    localStorage.setItem("email" , email)
    localStorage.setItem("password" , password) 
    
    email === "admin@gmail.com" && dispatch(actionTypes.setAdmin(true));
    dispatch(actionTypes.isLoggedin(true));
    navigate('/movies');
  }

  return (
    <>
      <div className="login-page min-h-screen flex flex-col justify-center items-center bg-neutral text-white">
        <form className="login-container bg-gray-800 p-8 rounded-lg shadow-lg" onSubmit={handleSubmit}>
          <h1 className="login-title text-4xl font-bold text-primary mb-3 text-center">Sign In</h1>
          
          <p className="text-center text-gray-400 mb-6 mt-6">
            Discover all the details about your favorite movies and series in one place.
          </p>

          <input 
            type="email" 
            className="input login-input mb-4 p-3 rounded-md text-black" 
            placeholder="Email" 
            required 
            onChange={(e) => setEmail(e.target.value)} 
          />

          <input 
            type="password" 
            className="input login-input mb-6 p-3 rounded-md text-black" 
            placeholder="Password" 
            required 
            onChange={(e) => setPassword(e.target.value)} 
          />

          <button type="submit" className="btn btn-primary w-full p-3 rounded-md">Sign In</button>

          <p className="mt-4 text-center text-sm text-gray-400">
            {/* Don't have an account? <Link to="/signup" className="text-primary hover:underline">Sign up</Link> */}
          </p>
        </form>
      </div>
    </>
  );
};
  
  export default Login;
  