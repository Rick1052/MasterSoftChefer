import React from "react";

import './header.css';

import Logo from '../../assets/imagens/logo_png.png';

function Header(){

    return(
        <div className="cabecalho">
            <img src={Logo} alt='Logo'/>
            <h1>Lista de Receitas</h1>
        </div>
    );
}

export default Header;