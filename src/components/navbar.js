import React from 'react'
import { Link } from 'react-router-dom'

function Navbar(){
    return(
    <div id='navbar'>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <Link className="navbar-brand" to="/">Poc</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarColor01">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/cadastro-contrato">Cadastro</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/consulta-contratos">Consulta</Link>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
    );
}

export default Navbar;