import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import Receitas from './pages/Receitas';
import Error from './pages/Error';

function RoutesApp() {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path='/' element={ <Home /> } />
                <Route path='/receitas/:id' element={ <Receitas /> } />  {/* Corrigido aqui */}
                <Route path='*' element={ <Error /> } />
            </Routes>
            <Footer/>
        </BrowserRouter>
    );
}

export default RoutesApp;
