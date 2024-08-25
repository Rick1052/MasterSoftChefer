import React from "react";

import './error.css';

function Error(){
    return(
        <div className="error-container">
            <div className="error-content">
                <h1 className="error-title">404</h1>
                <p className="error-message">Desculpe, a página que você está procurando não foi encontrada.</p>
                <a href="/" className="error-link">Voltar para a página inicial</a>
            </div>
        </div>
    )
}

export default Error;