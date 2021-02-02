import React from 'react'

export default (props) =>(
    <table className="table table-hover">
        <thead>
            <tr>
                <th>Id</th>
                <th>Descrição</th>
                <th>Data Inicio</th>
                <th>Data Final</th>
                <th>Ativo</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {   
                props.contratos.map( (contrato, index) =>{
                    return (
                        <tr key={index}>
                            <th>{contrato.id}</th>
                            <th>{contrato.descricao}</th>
                            <th>{contrato.dataVigenciaInicial}</th>
                            <th>{contrato.dataVigenciaFinal}</th>
                            <th>{contrato.ativo}</th>
                            <th>
                                <button onClick={ () => props.editarAction(contrato.id) } 
                                    className="btn btn-primary"> Editar</button>
                                <button onClick={ () => props.deletarAction(contrato.id) } style={{ marginLeft:'1em' }}
                                    className="btn btn-danger">Excluir</button>
                            </th>
                        </tr>
                    )
                })
            }
        </tbody>
    </table>
);