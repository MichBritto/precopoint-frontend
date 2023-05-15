<template>
    <Navbar/>
    <div class="container">
        <div class="row  ">
            <div class="col">
                <div class="d-flex justify-content-between mt-4 mb-4" >
                    <p></p>
                    <div class="text-center mx-auto text-uppercase"> <span class="h1 text-warning fw-bold" >produtos</span></div>
                    <button type="button" class="btn btn-dark hover">Adicionar Novo Produto</button>
                    
                </div>
            </div>
        </div> 
        <hr>
        <nav aria-label="Page navigation center">
            <ul class="pagination justify-content-center">
                <li class="page-item" :class="{ disabled: currentPage === 1 }">
                    <a class="page-link" href="#" aria-label="Previous" @click.prevent="currentPage--">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: currentPage === page }">
                    <a class="page-link" href="#" @click.prevent="currentPage = page">{{ page }}</a>
                </li>
                <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                    <a class="page-link" href="#" aria-label="Next" @click.prevent="currentPage++">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
        <table class="container table-light table-hover text-center">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Produto</th>
                    <th scope="col">Descrição</th>
                    <th scope="col">Preço</th>
                    <th scope="col">Marca</th>
                    <th scope="col">Categoria</th>
                    <th scope="col">Imagem Produto</th> 
                    <th scope="col">Editar</th>                   
                </tr>
            </thead>
            <tbody>
                <tr v-for="produto in slicedItems" :key="produto.id">
                    <th scope="row">{{ produto.id }}</th>
                    <td>{{ produto.produto }}</td>
                    <td>{{ produto.descricao }}</td>
                    <td>R$ {{ (Number(produto.preco)).toLocaleString('pt-BR', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                                useGrouping: true
                            }) }}
                    </td>
                    <td>{{ produto.marcaProduto }}</td>
                    <td>{{ produto.categoria }}</td>
                    <td><img v-bind:src="produto.imagem" width="30" height="30"></td>
                    <td><i class="fa-solid fa-pen-to-square hand-cursor" @click="callEditProduto(produto)"></i></td>
                </tr>
            </tbody>
        </table>
        
        <!--Atualizar Produto-->
        <div v-if="callModal" class="modal-overlay">
            <div class="card col-6 mx-auto">
                <div class="card-body">
                    <h5 class="card-title text-center">Atualização de Produto</h5>
                    <form @submit.prevent="atualizarProduto">
                        <!-- Produto -->
                        <div class="mb-3">
                            <label for="produto" class="form-label">Produto:</label>
                            <div class="form-check">
                                <input id="produto" type="checkbox" v-model="produtoAtivo" class="form-check-input">
                                <input v-if="!produtoAtivo" type="text" v-model="produtoAtual.produto" class="form-control" disabled>
                                <input v-if="produtoAtivo" type="text" v-model="produto" class="form-control">
                            </div>
                        </div>
                         <!-- Preco -->
                        <div class="mb-3">
                            <label for="preco" class="form-label">Preço:</label>
                            <div class="form-check">
                                <input id="preco" type="checkbox" v-model="precoAtivo" class="form-check-input">
                                <input v-if="!precoAtivo" type="text" :value="produtoAtual.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })" class="form-control" disabled>
                                <div class="input-group" v-if="precoAtivo">
                                    <span class="input-group-text">R$</span>
                                    <input  type="text" v-model="preco" class="form-control">
                                </div>
                                
                                
                                
                            </div>
                        </div>
                         <!-- imagem -->
                         <div class="mb-3">
                            <label for="imagem" class="form-label">Imagem(URL):</label>
                            <div class="form-check">
                                <input id="imagem" type="checkbox" v-model="imagemAtivo" class="form-check-input">
                                <input v-if="!imagemAtivo" type="text" v-model="produtoAtual.imagem" class="form-control" disabled>
                                <input v-if="imagemAtivo" type="text" v-model="imagem" class="form-control">
                            </div>
                        </div>
                        <!-- descricao -->
                        <div class="mb-3">
                            <label for="descricao" class="form-label">Descricão:</label>
                            <div class="form-check">
                                <input id="descricao" type="checkbox" v-model="descricaoAtivo" class="form-check-input">
                                <input v-if="!descricaoAtivo" type="text" v-model="produtoAtual.descricao" class="form-control" disabled>
                                <input v-if="descricaoAtivo" type="number" v-model="descricao" class="form-control">
                            </div>
                        </div>
                        <!-- categoria -->
                        <div class="mb-3">
                            <label for="categoria" class="form-label">Categoria:</label>
                            <div class="form-check">
                                <input id="categoria" type="checkbox" v-model="categoriaAtivo" class="form-check-input">
                                <input v-if="!categoriaAtivo" type="text" v-model="produtoAtual.categoria" class="form-control" disabled>
                                <input v-if="categoriaAtivo" type="text" v-model="categoria" class="form-control">
                            </div>
                        </div>
                        <div class="text-center">
                            <button class="btn btn-outline-success me-1" type="submit">Atualizar Dados</button>
                            <button class="btn btn-outline-danger" @click="cancelarAtualizacaoProduto">Cancelar atualização</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
   
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import Navbar from '../components/HeaderTemplate.vue'
    import IProduto from '@/interfaces/IProduto'
    import api from '@/http'
    import Cookies from 'js-cookie'


    export default defineComponent({
        name: "ListaFornecedor",
        components: {
            Navbar,
        },
        data() {
            return{
                listaProduto: [] as IProduto[],
                currentPage: 1,
                itemsPerPage: 10,
                totalPages: 0,
                callModal: false,
                produtoAtual: {} as IProduto,
                produto: '',
                preco: 0.0,
                imagem: '',
                descricao: '',
                marcaProduto: '',
                fornecedor: '',
                categoria: '',
                produtoAtivo: false,
                precoAtivo: false,
                imagemAtivo: false,
                descricaoAtivo: false,
                marcaProdutoAtivo: false,
                fornecedorAtivo: false,
                categoriaAtivo: false
            }
        },
        computed: {
            slicedItems(): IProduto[] {
                const start = (this.currentPage - 1) * this.itemsPerPage;
                const end = start + this.itemsPerPage;
                return this.listaProduto.slice(start, end);
            },
            
        },
        methods: {
            async getListaProduto(){
                await api.get('filtro/list-produto')
                    .then((response) => {
                        this.listaProduto = response.data;
                        this.totalPages = Math.ceil(this.listaProduto.length / this.itemsPerPage);
                    })
            },
            callEditProduto(produto: IProduto) {
                
                if(this.callModal)
                    this.callModal = false;
                else{
                    this.produtoAtual = produto;
                    this.callModal = true; 
                }       
            },
            cancelarAtualizacaoProduto(){
                this.produto = '';
                this.preco = 0.0;
                this.imagem = '';
                this.descricao = '';
                this.marcaProduto = '';
                this.fornecedor = '';
                this.categoria = '';
                this.produtoAtivo = false;
                this.precoAtivo = false;
                this.imagemAtivo = false;
                this.descricaoAtivo = false;
                this.marcaProdutoAtivo = false;
                this.fornecedorAtivo = false;
                this.categoriaAtivo = false;
                this.callModal = false;
            },
            async atualizarProduto(){
                await api.put('produto/update/'+ this.produtoAtual.id,
                {
                    produto:this.produto,
                    preco: this.preco,
                    imagem: this.imagem,
                    descricao: this.descricao,
                    marcaProduto: this.marcaProduto,
                    fornecedor: this.produtoAtual.fornecedor,
                    categoria: this.categoria 
                },
                {
                    headers: {
                        Authorization: 'Bearer '+ Cookies.get('token')
                    }
                })
                .then((response) => {
                    this.atualizacaoBemSucedida()
                })
                .catch((error) => {
                    console.log(error)
                })
            },
            atualizacaoBemSucedida(){
                this.produto = '';
                this.preco = 0.0;
                this.imagem = '';
                this.descricao = '';
                this.marcaProduto = '';
                this.fornecedor = '';
                this.categoria = '';
                this.produtoAtivo = false;
                this.precoAtivo = false;
                this.imagemAtivo = false;
                this.descricaoAtivo = false;
                this.marcaProdutoAtivo = false;
                this.fornecedorAtivo = false;
                this.categoriaAtivo = false;
                this.callModal = false;
                alert('Atualização de produto bem sucedida');
                this.getListaProduto();
            },
                

        },
        mounted() {
            this.getListaProduto()
            
        },
        watch: {
            listaProduto() {
                this.totalPages = Math.ceil(this.listaProduto.length / this.itemsPerPage);
            },
        },
    })
</script>

<style scoped>
    th, td {
        vertical-align: middle; /* alinhamento vertical */
    }
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
    }

    .modal-content {
        background-color: #fff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        padding: 20px;
        height: 50%;
        width: 50%;
    }
    .hand-cursor {
        cursor: pointer;
    }
</style>
