import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import AdicionarReceita from './pages/AdicionarReceita';

function RoutesApp(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/adicionar' element={<AdicionarReceita/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default RoutesApp;