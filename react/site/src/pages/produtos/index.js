
import Cabecalho from '../../components/cabecalho'
import Menu from '../../components/menu'

import { Container, Conteudo } from './styled'

import { useState, useEffect } from 'react';

import Api from '../../service/api';

const api = new Api();

export default function Index() {
    const [produtos, setProdutos] = useState([]);
    const [nproduto, setNproduto] = useState('');
    const [categoria, setCategoria] = useState('');
    const [preco_de, setPreco_de] = useState('');
    const [preco_por, setPreco_por] = useState('');
    const [avaliacao, setAvaliacao] = useState('');
    const [dsproduto, setDsproduto] = useState('');
    const [estoque, setEstoque] = useState('');
    const [imgproduto, setImgproduto] = useState('');
    const [idProduto, setIdProduto] = useState(0);
    
    
    

    async function listar() {
        let r = await api.listar();
        console.log(r);
        setProdutos(r);
    }

    async function inserir(){
        if(idProduto == 0){
        let r = await api.inserir(nproduto, categoria, preco_de, preco_por, avaliacao, dsproduto, estoque, imgproduto);

        if(r.erro)
            alert(r.erro);
            else
        alert('Produto inserido');
        } else {
        let r = await api.alterar(idProduto, nproduto, categoria, preco_de, preco_por, avaliacao, dsproduto, estoque, imgproduto);
        if(r.erro)
            alert(r.erro);
            else
        alert('Produto alterado');


        }

        limparcampos();
        listar();
    }
 
    function limparcampos() {
        setNproduto('');
        setCategoria('');
        setPreco_de('');
        setPreco_por('');
        setAvaliacao('');
        setDsproduto('');
        setEstoque('');
        setImgproduto('');
        setIdProduto(0);
    }    
    async function remover(id) {
        let r = await api.remover(id);
        alert(' Produto removido !!!');

        listar();
    }

    async function editar(item) {
        setNproduto(item.nm_produto);
        setCategoria(item.ds_categoria);
        setPreco_de(item.vl_preco_de);
        setPreco_por(item.vl_preco_por);
        setAvaliacao(item.vl_avaliacao);
        setDsproduto(item.ds_produto);
        setEstoque(item.qtd_estoque);
        setImgproduto(item.img_produto);
        setIdProduto(item.id_produto);
    }


    useEffect(() => {
        listar();
    }, [])

    return (
        <Container>
            <Menu />
            <Conteudo>
                <Cabecalho />
                <div class="body-right-box">
                    <div class="new-student-box">
                        
                        <div class="text-new-student">
                            <div class="bar-new-student"></div>
                            <div class="text-new-student">{idProduto == 0 ? "Novo Produto" : "Alterando Produto " + idProduto }</div>
                        </div>

                        <div class="input-new-student"> 
                            <div class="input-left">
                                <div class="agp-input"> 
                                    <div class="name-student"> Nome: </div>  
                                    <div class="input"> <input type="text" value={nproduto} onChange={e => setNproduto(e.target.value)}  /> </div>  
                                </div> 
                                <div class="agp-input">
                                    <div class="number-student"> Categoria </div>  
                                    <div class="input"> <input type="text" value={categoria} onChange={e => setCategoria(e.target.value)} />  </div> 
                                </div>

                                <div class="agp-input">
                                    <div class="number-student"> Avaliação: </div>  
                                    <div class="input"> <input type="text" value={avaliacao} onChange={e => setAvaliacao(e.target.value)} /> </div> 
                                </div>

                                <div class="agp-input">
                                    <div className="number1-student"> Link Imagem: </div>  
                                    <div className="i1"> <input type="text" value={imgproduto} onChange={e => setImgproduto(e.target.value)} />  </div> 
                                </div>
                                
                                <div class="agp-input">
                                    <div className="number1-student"> Descrição: </div>  
                                    <div className="i2"> <input type="text" value={dsproduto} onChange={e => setDsproduto(e.target.value)} /> </div> 
                                </div>
                                
                            </div>

                            <div class="input-right">
                                <div class="agp-input">
                                    <div class="corse-student"> Preço DE: </div>  
                                    <div class="input"> <input type="text" value={preco_de} onChange={e => setPreco_de(e.target.value)} />  </div>  
                                </div>
                                <div class="agp-input">
                                    <div class="class1-student"> Preço POR: </div>  
                                    <div class="input"> <input type="text" value={preco_por} onChange={e => setPreco_por(e.target.value)} />  </div> 
                                </div>

                                <div class="agp-input">
                                    <div class="class-student"> Estoque: </div>  
                                    <div class="input"> <input type="text" value={estoque} onChange={e => setEstoque(e.target.value)}/> </div> 
                                </div>                           
                            </div>
                            <div class="button-create"> <button onClick={inserir}> {idProduto == 0 ? "Cadastra" : "Alterar"} </button> </div>
                        </div>
                    </div>

                    <div class="student-registered-box">
                        <div class="row-bar"> 
                            <div class="bar-new-student"> </div>
                            <div class="text-registered-student"> Produtos Cadastrados </div>
                        </div>
                    
                        <table class ="table-user">
                            <thead>

                                
                                <tr>
                                    <th>  </th>
                                    <th> ID </th>
                                    <th> Produto </th>
                                    <th> Categoria </th>
                                    <th> Preço </th>
                                    <th> Estoque </th>
                                    <th class="coluna-acao"> </th>
                                    <th class="coluna-acao"> </th>
                                </tr>
                                
                            </thead>
                    
                            <tbody>
                                
                                {produtos.map((item, i) =>
                                <tr className={ i % 2 == 0 ?"linha-alternada" : ""}>
                                    <td>  <img src={item.img_produto} alt="" style={{width: '40px', height: '40px'}}/> </td>
                                    <td> {item.id_produto} </td>
                                    <td> {item.nm_produto} </td>
                                    <td> {item.ds_categoria} </td>
                                    <td> {item.vl_preco_por} </td>
                                    <td> {item.qtd_estoque} </td>
                                    <td className= "coluna-acao"> <button onClick={() => editar(item)}> <img src="/assets/images/edit.svg" alt="" /> </button> </td>
                                    <td className= "coluna-acao"> <button onClick={() => remover(item.id_produto)}> <img src="/assets/images/trash.svg" alt="" /> </button> </td>
                                </tr>
                                )}
                           
                                
                            </tbody> 
                        </table>
                    </div>
                </div>
            </Conteudo>
        </Container>
    )
}