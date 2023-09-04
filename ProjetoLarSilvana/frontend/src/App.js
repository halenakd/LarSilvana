//import logoLarSilvana from '../public/logolarsilvana.png';
import './App.css';
import {Route, Routes} from 'react-router-dom';
import NavBar from "./components/navbar"
import Home from './pages/home';
import Sobre from './pages/sobre';
import Doar from './pages/doar';
import Adotar from './pages/adotar';
import Contato from './pages/contato';
import FAQ from './pages/faq';

function App() {
  return (
    <>
      <NavBar/>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/doar" element={<Doar />} />
          <Route path="/adotar" element={<Adotar />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>
      </div>  
    </>
  )
}

export default App;

// <Route path="/" exact component={HomePage} />