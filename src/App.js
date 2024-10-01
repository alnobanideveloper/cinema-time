import Login from './components/pages/LoginPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux'
import Home from './components/pages/Home';
import Store from './contexts/Store';
import Stats from './components/pages/Stats';
import MovieDetails from './components/pages/MovieDetailsPage';

function App() {
  return (
    <Router>

        <Provider store={Store}>
          <>
            <Routes>
              <Route path='/' element={<Login />} />
              <Route path='/movies' element={<Home />} />
              <Route path='/series' element={<Home />} />
              <Route path='/movie/*' element={<MovieDetails type={"Movies"} />} />
              <Route path='/serie/*' element={<MovieDetails type={"Series"} />} />
              <Route path='/stats' element={<Stats />} />

            </Routes>
          </>
        </Provider>
    </Router>

  );
}

export default App;
