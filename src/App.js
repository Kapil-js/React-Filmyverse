import './App.css';
import Cards from './components/Cards';
import Header from './components/Header';
import AddMovie from './components/AddMovie';
import { Routes, Route } from 'react-router-dom'
import Details from './components/Details';
import Login from './components/Login';
import Signup from './components/Signup';
import NotFound from './components/NotFound.jsx';
import { createContext, useState } from 'react';

const Appstate = createContext();

function App() {
  const [login, setLogin] = useState(false);
  const [userName, setUserName] = useState("");



  return (
    <>
      <Appstate.Provider value={{ login, userName, setLogin, setUserName }}>
        <Header />
        <Routes>
          <Route path='/' element={<Cards />} />
          <Route path='/addmovie' element={<AddMovie />} />
          <Route path='/detail/:id' element={<Details />} />
          <Route path='/*' element={<NotFound />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </Appstate.Provider>
    </>
  );
}

export default App;
export { Appstate }