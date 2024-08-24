import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Receitas from './pages/Receitas';

function RoutesApp() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/receitas/:id' element={<Receitas />} />
            </Routes>
        </BrowserRouter>
    );
}

export default RoutesApp;