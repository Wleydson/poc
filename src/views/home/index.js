import React from 'react'
import { Link } from 'react-router-dom'

function Home (){
    return(
        <div id="home">
            <div className="jumbotron">
                <h1 className="display-3">Bem vindo</h1>
                <p className="lead">
                    POC para o marketplace
                </p>
                <hr className="my-4" />
                <p className="lead">
                    <Link className="btn btn-primary btn-lg" to="/cadastro-contrato" role="button">
                        Cadastrar
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Home;
