import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './views/home/index'
import CadastroContrato from './views/contratos/cadastro'
import ConsultaContratos from './views/contratos/consultaContratos'

export default () => {
    return(
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/cadastro-contrato/:id?" component={CadastroContrato} />
            <Route exact path="/consulta-contratos" component={ConsultaContratos} />
        </Switch>
    );
}