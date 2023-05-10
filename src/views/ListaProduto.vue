<template>
    <Navbar />
    <div class="container mt-4" v-if="loadPage">
        <div class="row">
            <div class="col">
                <div class="d-flex justify-content-between mt-4 mb-4">
                
                    
                    <div class="text-center mx-auto text-uppercase"> 
                    <span class="h1 text-warning fw-bold">listas de produtos</span>
                    </div>
                    <geraPDF :products="filteredList" :disabled="listaProdutos.length === 0"/>

                </div>
            </div>
        </div>
        <hr>
        <div class="container">
            <div class="row">
            <div class="col-3">
                <span class="h2 fw-bold">Descrição da Lista</span>
                
            </div>
            <div class="col-4"></div>
                
                <div class="col-5 d-flex justify-content-end">
                    <div class="form-group" style="display: flex">
                        <input type="text" class="form-control mr-2" style="flex: 2;" v-model="searchTerm">
                        <button class="btn btn-dark hover "  style="flex: 1;width: 25%; margin-left: 2%" @click="searchList">Pesquisar</button>
                    </div>
                </div>  
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="tabela col-12 col-md-8">
                
                <form>
                <table class="table table-bordered" >
                    <thead class="table-dark text-center">
                    <tr>
                        <th scope="col">Imagem</th>
                        <th scope="col">Produto</th>
                        <th scope="col">Detalhes</th>
                        <th scope="col" style="width:12.5%">Quantidade</th>
                        <th scope="col">Valor</th>
                        <th scope="col">Alterar</th>
                    </tr>
                    </thead>
                    <tbody v-if="filteredList.length > 0">
                        <tr v-for="(produto, index) in itemsToShow" :key="index" class="table-light table-hover text-center">
                          
                          <td><img v-bind:src="produto.imagem" width="30" height="30"></td>
                          <td style="text-align:left">{{ produto.produto }}</td>
                          <td>{{ produto.descricao }}</td>
                          <td>{{ produto.quantidade }}</td>
                          <td>R$ {{ (Number(produto.preco) * produto.quantidade).toLocaleString('pt-BR', {
                                          minimumFractionDigits: 2,
                                          maximumFractionDigits: 2,
                                          useGrouping: true
                                        }) }}
                          </td>
                          <td>
                            <EditarListaProduto :produto="produto" @editar-quantidade="atualizarQuantidade(1 ,produto.id, $event)" />
                          </td>
                        </tr>
                      </tbody>
                      <tbody v-else>
                        <tr>
                          <td colspan="7" class="text-center">Nenhum produto encontrado</td>
                        </tr>
                      </tbody>
                    
                </table>
                <Total :produtos="listaProdutos"/>
                
                <Pagination :key="paginationKey" :currentPage="currentPage" :totalItems="totalItems" :itemsPerPage="parseInt(itemsPerPage)" v-on:page-changed="fetchData" ></Pagination>
                  
                </form>
                
            </div>

            <div class="col-12 col-md-4">
                <ListaCompara :produtos="listaProdutos" />
                
            </div>
        </div>
        <!--container-->
    </div>
    <div class="container" v-if="loadPage">
        <div class="col text-end">
            <button type="button" class="btn btn-dark hover ">Salvar</button>
        </div>
        

    </div>
    <div v-if="!loadPage" class="d-flex align-items-center justify-content-center" style="height: 50vh;">
        <span class="h4 text-muted">Nenhuma lista foi encontrada</span>
    </div>       
</template>

<script lang="ts">
import Total from '@/components/Total.vue'
import Navbar from '../components/HeaderTemplate.vue'
import ListaCompara from '../components/ListaCompara.vue'
import IProduto from '../interfaces/IProduto'
import EditarListaProduto from '../components/EditarListaProduto.vue'
import { defineComponent, VueElement } from 'vue'
import Cookies from 'js-cookie'
import axios from 'axios'
import Pagination from '@/components/Pagination.vue'
import geraPDF from '@/components/geraPDF.vue'

export default defineComponent({
    name: "ListaProduto",
    components: {
        Navbar,
        ListaCompara,
        EditarListaProduto,
        Total,
        Pagination,
        geraPDF

    },
    data() {
        return {

            listaProdutos: [{
                id: 1,
                produto: "Chocolate Kit Kat ao Leite",
                preco: "3.99",
                quantidade: 10,
                imagem: "https://d3o3bdzeq5san1.cloudfront.net/thumbs/290/289082.jpg",
                descricao: "41g",
                marcaProduto: "Carrefour"
            }, {
                id: 2,
                produto: "Bis Xtra Chocolate ao Leite",
                preco: "3.99",
                quantidade: 5,
                imagem: "https://images-americanas.b2w.io/produtos/01/00/img/89818/4/89818428_1GG.jpg",
                descricao: "45g",
                marcaProduto: "Americanas"
            },
            {
                id: 3,
                produto: "Fini Dentaduras",
                preco: "6.99",
                quantidade: 10,
                imagem: "https://images-americanas.b2w.io/produtos/01/00/img/6889/6/6889656_1GG.jpg",
                descricao: "90g",
                marcaProduto: "FiniStore"
            },
            {
                id: 4,
                produto: "Fini Dentaduras",
                preco: "6.99",
                quantidade: 10,
                imagem: "https://images-americanas.b2w.io/produtos/01/00/img/6889/6/6889656_1GG.jpg",
                descricao: "90g",
                marcaProduto: "FiniStore"
            },
            {
                id: 5,
                produto: "Fini Dentaduras",
                preco: "6.99",
                quantidade: 10,
                imagem: "https://images-americanas.b2w.io/produtos/01/00/img/6889/6/6889656_1GG.jpg",
                descricao: "90g",
                marcaProduto: "FiniStore"
            },
            {
                id: 6,
                produto: "Fini Dentaduras",
                preco: "6.99",
                quantidade: 10,
                imagem: "https://images-americanas.b2w.io/produtos/01/00/img/6889/6/6889656_1GG.jpg",
                descricao: "90g",
                marcaProduto: "FiniStore"
            }
        ] as IProduto[],
            searchTerm: '',
            filteredList: [] as IProduto[],
            dadoRecebido: null,
            listaId: Cookies.get('lista'),
            currentPage: 1,
            totalItems: 0,
            itemsPerPage: "3",
            itemsToShow: [] as IProduto [],
            loadPage: true,
            paginationKey: 1
            
        } 
    },
    created() {
        this.listaId = "1"
        if (this.listaId !== undefined) {
            this.getLista(this.listaId);
            this.filteredList = this.listaProdutos
            this.totalItems = this.filteredList.length
            this.fetchData(this.currentPage)
        } else{
            this.loadPage = false
        }
        
        
    },
    methods: {
        listaEstaVazia(listaProdutos: Array<IProduto>) {
                return listaProdutos.length === 0
        },
        searchList(){
            if(this.searchTerm == '') {
                
                this.filteredList = this.listaProdutos
                
                this.updateData()
                this.fetchData(this.currentPage)

            }
            else{
                this.filteredList = []
                
                this.listaProdutos.forEach(produto => {
                    if(produto.produto.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1){
                        this.filteredList.push(produto)
                    }
                });
                
                this.updateData()
                this.fetchData(this.currentPage)
            }
        },

        async getLista(id : string){
          
            try {
                const token = Cookies.get("token")
                const headers = {
                    'Authorization': `Bearer ${token}`
                };

                axios.post('http://localhost:8080/listaProdutos', id, { headers })
                .then(response => {
                    const data = response.data;
                    console.log(data);
                    this.listaProdutos = data;
                })
                .catch(error => {
                    console.log('Erro:', error);
                });
            }
            catch{
                console.log("Erro ao carregar lista.")
            }
        },
        atualizarQuantidade(id: number, index: number, novaQuantidade: number) {
            index = index - 1
            const produto = this.filteredList[index]
            produto.quantidade = novaQuantidade
                
            this.listaProdutos[index].quantidade = produto.quantidade
            this.filteredList[index].quantidade = produto.quantidade
            this.fetchData(this.currentPage)
            /*const produto = this.listaProdutos.find(p => p.id === id);
            if (produto) {
                produto.quantidade = novaQuantidade;
            }*/
            
        },


        fetchData(page : any) {
            // calcula o índice do primeiro e do último item a serem exibidos na página selecionada
            const firstItem = (page - 1) * parseInt(this.itemsPerPage);
            const lastItem = firstItem + parseInt(this.itemsPerPage);

            // atualiza o estado do componente para exibir apenas os itens correspondentes à página selecionada
            this.itemsToShow = this.filteredList.slice(firstItem, lastItem);

            // atualiza a página atual
            this.currentPage = page;
        },
        updateData() {
            // altera o valor da chave para forçar o componente ser carregado novamente
            this.totalItems = this.filteredList.length
            this.paginationKey++
        }
        
    }
        

    })
</script>

<style scoped>
    th, td {
  vertical-align: middle; /* alinhamento vertical */
}
.pagination-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
</style>
