import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, createUser } from "../../firebase";
import { useLocation } from "react-router-dom";
import Alert from "../layouts/Alert";
import actionTypes, { setAlert } from "../../contexts/Actoins";

const Login = () => {
  const path = useLocation().pathname;

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  useEffect(() => {
    localStorage.setItem('isLogIn' , false);
    setEmail('')
    setPassword('')
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path])

  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize the hook
  const type = useSelector(state => state.alert.alertType);



  const handleSubmit = async (e) => {
    e.preventDefault();

    localStorage.clear();
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);

    if (path === '/signup') { //signin page

      const { isErr, msg } = await createUser(email, password);
      console.log(msg, isErr);

      if (!isErr) {
        email === "admin@gmail.com" && dispatch(actionTypes.setAdmin(true));
        localStorage.setItem('isLogIn' , true);
        navigate('/movies');
      }

      else {
        console.log(msg, "test");
        switch (msg) {
          case 'invalid-email':
            dispatch(setAlert('unvalid email', 1));
            break;
          case 'weak-password':
            dispatch(setAlert('weak password', 2));
            break;
          case 'email-already-in-use':
            dispatch(setAlert('email already in use', 1));
            break;
          default:
            break;
        }
      }
    }

    else { //signup page

      const { isErr, msg } = await login(email, password);
      console.log(isErr, msg);

      if (!isErr) {
        email === "admin@gmail.com" && dispatch(actionTypes.setAdmin(true));
        localStorage.setItem('isLogIn' , true);
        navigate('/movies');
      }

      else {
        console.log(msg, type);
        dispatch(setAlert('Wrong Email Or Password', 1));
      }
    }
  }

  return (
    <>
      <div className="login-page min-h-screen flex flex-col justify-center items-center">
        <form className="login-container bg-gray-800 p-8 rounded-lg shadow-lg" onSubmit={handleSubmit}>
          <h1 className="login-title text-4xl font-bold text-primary mb-3 text-center">{path === '/' ? 'Sign In' : 'Sign Up'}</h1>

          <p className="text-center text-gray-300 mb-6 upp mt-6">
            Discover all the details about your favorite movies and series in one place.
          </p>
          {type === 1 && <Alert />}
          <input
            type="email"
            className="input login-input bg-white mb-4 p-3 text-black"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {type === 2 && <Alert />}
          <input
            type="password"
            className="input login-input bg-white mb-6 p-3 text-black"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="btn btn-primary w-full p-3">{path==='/' ? 'Sign In' :'Sign Up'}</button>

          <p className="mt-4 text-center text-sm text-gray-400">
            {
              path === '/' ?
                <>
                  Don't have an account? <Link to="/signup" className="text-primary hover:underline">Join now</Link>
                </> :

                <>
                  Already Have an account?<Link to="/" className="text-primary hover:underline">Sign In</Link>
                </>
            }
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
