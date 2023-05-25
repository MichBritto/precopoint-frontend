<template>
    <Navbar />
    <div class="container mt-4" v-if="loadPage">
        <div class="row">
            <div class="col">
                <div class="d-flex justify-content-between mt-4 mb-4">
                
                    
                    <div class="text-center mx-auto text-uppercase"> 
                    <span class="h1 text-warning fw-bold">listas de produtos</span>
                    </div>
                    <div class="text-center">
                        <button class="btn btn-warning hover"  style="flex: 1;margin-bottom:2px" @click="getLista(listaId as any)"><i class="fa-solid fa-pen-to-square" style="color: #ffffff;"></i></button>
                        <geraPDF :products="listaProdutos"  />
                    </div>
                    

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
                        <input type="text" class="form-control mr-2" style="flex: 2;" placeholder="Pesquisar produto..." v-model="searchTerm">
                        <button class="btn btn-dark hover"  style="flex: 1;width: 25%; margin-left: 2%"  @click="searchList">Pesquisar</button>
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
                        <th scope="col">Preco</th>
                        <th scope="col" style="width:12.5%">Quantidade</th>
                        <th scope="col">Valor</th>
                        <th scope="col" v-if="isListaUsuario">Alterar</th>
                    </tr>
                    </thead>
                    <tbody v-if="filteredList.length > 0">
                        <tr v-for="(produto, index) in itemsToShow" :key="index" class="table-light table-hover text-center">
                          
                          <td><img v-bind:src="produto.imagem" width="30" height="30"></td>
                          <td style="text-align:left">{{ produto.produto }}</td>
                          <td>{{ produto.descricao }}</td>
                          <td>R$ {{ (produto.preco).toLocaleString('pt-BR', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                            useGrouping: true
                          }) }}</td>
                          <td>{{ produto.qtde }}</td>
                          <td>R$ {{ (produto.preco * produto.qtde).toLocaleString('pt-BR', {
                                          minimumFractionDigits: 2,
                                          maximumFractionDigits: 2,
                                          useGrouping: true
                                        }) }}
                          </td>
                          <td v-if="isListaUsuario">
                            <EditarListaProduto :produto="produto" @editar-quantidade="atualizarQuantidade(produto.id, $event)" />
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
                <div class="d-flex justify-content-center">
                    <Pagination :key="paginationKey" :currentPage="currentPage" :totalItems="totalItems" :itemsPerPage="parseInt(itemsPerPage)" v-on:page-changed="fetchData" ></Pagination>
                </div>
                
                  
                </form>
                
            </div>
                
            <div class="col-12 col-md-4">
                <ListaCompara :produtos="listaProdutos" :key="componentKey" @loadFornec="loadCompare" />
            </div>
        </div>
        <!--container-->
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
import { defineComponent } from 'vue'
import Cookies from 'js-cookie'
import Pagination from '@/components/Pagination.vue'
import geraPDF from '@/components/geraPDF.vue'
import api from '@/http'
import Swal from 'sweetalert2'

interface FornecedoresComLogotipos {
        [fornecedor: string]: {
            valorTotal: number,
            logotipo: string | null
        }
    }
export default defineComponent({
    name: "ListaProduto",
    components: {
        Navbar,
        ListaCompara,
        EditarListaProduto,
        Total,
        Pagination,
        geraPDF,
        

    },
    data() {
        return {
            
            listaProdutos:[] as IProduto[], 
            searchTerm: '',
            filteredList: [] as IProduto[],
            dadoRecebido: null,
            listaId: Cookies.get('lista'),
            currentPage: 1,
            totalItems: 0,
            itemsPerPage: "5",
            itemsToShow: [] as IProduto [],
            loadPage: true,
            paginationKey: 1,
            componentKey: 0,
            isListaUsuario: false
            
        } 
    },
    created() {
        if (this.listaId !== undefined) {
            this.getLista(this.listaId);
            
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
                
                this.fetchData(this.currentPage)

            }
            else{
                this.filteredList = []
                
                this.listaProdutos.forEach(produto => {
                    if(produto.produto.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1){
                        this.filteredList.push(produto)
                    }
                });
                
                this.fetchData(this.currentPage)
            }
        },

        async getLista(id : string){  
                               
            try {
                const token = Cookies.get("token")
                const headers = {
                    'Authorization': `Bearer ${token}`
                };

                api.get('lista/getprodutos-lista/' + id, { headers : headers })
                .then(response => {
                    const data = response.data;
                    this.listaProdutos = data;
                    this.filteredList = this.listaProdutos
                    this.totalItems = this.filteredList.length
                    this.fetchData(this.currentPage)
                    this.isListaUsuario = true
                })
                .catch(error => {
                    console.log('Erro:', error);
                });
            }
            catch{
                console.log("Erro ao carregar lista.")
            }
        },
        atualizarQuantidade(id: number, novaQuantidade: number) {
            this.filteredList.forEach((product) => {
                if (product.id === id) {
                    const quantidadeAtual = product.qtde;

                    if (novaQuantidade === quantidadeAtual) {
                        return;
                    } else if (novaQuantidade <= 0) {
                        if (window.confirm("Deseja realmente remover este item?")) {
                        this.filteredList = this.filteredList.filter((product) => product.id !== id);
                        this.listaProdutos = this.filteredList;

                        let diferencaQuantidade = -quantidadeAtual; // Zerar a quantidade atual
                        // Envie uma requisição para adicionar a diferencaQuantidade ao produto no banco de dados
                        this.enviarAtualizacaoQuantidade(id, diferencaQuantidade)
                            .then(() => {
                            // Update the listaProdutos after successful request
                                this.listaProdutos = [...this.listaProdutos];
                            })
                            .catch((error) => {
                            console.error("Erro ao atualizar quantidade:", error);
                            });
                        }
                    } 
                    else {

                        if(novaQuantidade > quantidadeAtual){
                            let diferencaQuantidade = novaQuantidade - quantidadeAtual;
                            if (diferencaQuantidade < 0) {
                                diferencaQuantidade = Math.abs(diferencaQuantidade); // Converter para valor positivo
                            }
                            // Envie uma requisição para adicionar a diferencaQuantidade ao produto no banco de dados
                            this.enviarAtualizacaoQuantidade(id, diferencaQuantidade)
                            .then(() => {
                                // Update the listaProdutos after successful request
                                this.listaProdutos = [...this.listaProdutos];
                            })
                            .catch((error) => {
                                console.error("Erro ao atualizar quantidade:", error);
                            });
                        }else{
                            let diferencaQuantidade = novaQuantidade - quantidadeAtual;
                            if (diferencaQuantidade < 0) {
                                diferencaQuantidade = Math.abs(diferencaQuantidade); // Converter para valor positivo
                            }
                            // Envie uma requisição para adicionar a diferencaQuantidade ao produto no banco de dados
                            this.enviarAtualizacaoQuantidade(id, -diferencaQuantidade)
                            .then(() => {
                                // Update the listaProdutos after successful request
                                this.listaProdutos = [...this.listaProdutos];
                            })
                            .catch((error) => {
                                console.error("Erro ao atualizar quantidade:", error);
                            });
                        }
                    
                    }
                }
            });
            },

        async enviarAtualizacaoQuantidade(id: number, diferencaQuantidade: number) {
            const token = Cookies.get("token");
            const headers = {
                Authorization: `Bearer ${token}`,
            };
           
            const data = {
                produtoId: id,
                listaId: this.listaId,
                qtde: diferencaQuantidade,
            };

           

            Swal.fire({
                    title: 'Aguarde...',
                    text: 'Atualizando Quantidades',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    didOpen: () => {
                        Swal.showLoading();
                        api
                            .post("lista/addproduto", data, { headers })
                            .then((response) => {
                                if (this.listaId !== undefined) {
                                    this.getLista(this.listaId);
                                    this.listaProdutos = [...this.listaProdutos];
                                }
                                setTimeout(() => {
                                    this.reloadComponent()
                                    Swal.close();
                                }, 1000);
                            })
                            .catch((err) => {
                                Swal.fire('Erro ao atualizar quantidade', err.response.data.errorMessage, 'error');
                            });
                    }
                });
        },
        fetchData(page : number) {
            // calcula o índice do primeiro e do último item a serem exibidos na página selecionada
            const firstItem = (page - 1) * parseInt(this.itemsPerPage);
            const lastItem = firstItem + parseInt(this.itemsPerPage);

            // atualiza o estado do componente para exibir apenas os itens correspondentes à página selecionada
            this.itemsToShow = this.filteredList.slice(firstItem, lastItem);

            // atualiza a página atual
            this.currentPage = page;
            this.updateData()
        },
        updateData() {
            // altera o valor da chave para forçar o componente ser carregado novamente
            this.totalItems = this.filteredList.length
            this.paginationKey++
        },
        reloadComponent() {
            // Increment the key value to force component reload
            this.componentKey++;
        },
        loadCompare(fornec : string){
            const token = Cookies.get("token");
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            

           

            Swal.fire({
                title: 'Aguarde...',
                text: 'Carregando a lista',
                allowOutsideClick: false,
                allowEscapeKey: false,
                didOpen: () => {
                    Swal.showLoading();
                    api
                    .get("lista/" + this.listaId + "/" + fornec, { headers })
                    .then((response) => {
                        this.isListaUsuario = false
                        this.filteredList = response.data;
                        setTimeout(() => {
                            this.reloadComponent();
                            Swal.close();
                        }, 1000);
                    })

                }
            });
        },
    },
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
