import React from 'react'
import { Link } from 'react-router-dom'

function Home (){
    return(
        <div id="home">
            <div className="jumbotron">
                <h1 className="display-3">Bem vindo</h1>
                <p className="lead">
                    Esse é o seu sistema de produtos utilize a barra de navegação para acessar as outras páginas
                    ou clique em cadastrar.
                </p>
                <hr className="my-4" />
                <p className="lead">
                    <Link className="btn btn-primary btn-lg" to="/cadastro-produto" role="button">
                        Cadastrar
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Home;
