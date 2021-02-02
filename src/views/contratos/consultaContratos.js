import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import ContratoService from '../../app/contratoService'
import Card from '../../components/card'
import ContratosTable from './contratosTable'

class ConsultaContratos extends Component{

    constructor(){
        super();
        this.service = new ContratoService();
    }

    state = {
        contratos: []
    }

    componentDidMount(){
        const contratos = this.service.obtercontratos();
        
        if(contratos != null)
            this.setState({contratos});
    }

    preparaEditar = (id) =>{
        this.props.history.push(`/cadastro-contrato/${id}`);
    }

    deletar = (id) =>{
        const contratos = this.service.deletar(id);
        this.setState({ contratos });
    }

    render(){
        return(
        <div id='consulta-contrato'>
            <Card header="Listagem de contratos">
                <ContratosTable contratos={this.state.contratos} 
                               editarAction={this.preparaEditar} 
                               deletarAction={this.deletar}/>
            </Card>
        </div>
        );
    }
}

export default withRouter(ConsultaContratos)   