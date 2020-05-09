import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import ProdutoService from '../../app/produtoService'
import Card from '../../components/card'
import ProdutosTable from './produtosTable'

class ConsultaProduto extends Component{

    constructor(){
        super();
        this.service = new ProdutoService();
    }

    state = {
        produtos: []
    }

    componentDidMount(){
        const produtos = this.service.obterProdutos();
        
        if(produtos != null)
            this.setState({produtos});
    }

    preparaEditar = (sku) =>{
        this.props.history.push(`/cadastro-produto/${sku}`);
    }

    deletar = (sku) =>{
        const produtos = this.service.deletar(sku);
        this.setState({ produtos });
    }

    render(){
        return(
        <div id='consulta-produto'>
            <Card header="Listagem de produtos">
                <ProdutosTable produtos={this.state.produtos} 
                               editarAction={this.preparaEditar} 
                               deletarAction={this.deletar}/>
            </Card>
        </div>
        );
    }
}

export default withRouter(ConsultaProduto)   