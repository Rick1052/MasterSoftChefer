import React from "react";
import { Link } from "react-router-dom";

import './footer.css';

import Logo from '../../assets/imagens/logoHenrique.svg';

function Footer(){

    return(
        <div className="footer">
            <h3>Criado por <Link to='https://www.instagram.com/riick_gab/'>Henrique Santos</Link></h3>
            <img src={Logo} alt="Logo"/>
        </div>
    )
}

export default Footer;