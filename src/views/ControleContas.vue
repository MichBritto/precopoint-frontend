<template>
    <Navbar/>
    <div class="container">
        <div class="text-center mx-auto text-uppercase">
            <span class="h1 text-warning fw-bold">{{ tipoConta }}</span>
        </div>
        
        

        <div clas="container">

            <div class="row d-flex justify-content-between">
                <div class="col-md-4">
                  <span class="mt-1 fw-bold">Carregar:&nbsp;&nbsp;</span>
                  <button type="button" class="btn btn-warning hover" @click="CarregarClientes">Clientes</button>&nbsp;&nbsp;
                  <button type="button" class="btn btn-dark hover" @click="CarregarFornecedores">Fornecedores</button>
                </div>
                <div class="col-md-4 text-end"><RegFornecedor /></div>
              </div>
              
        </div>
        
        <hr>
       <div class="mt-5">
            <table class="container table-light table-hover text-center" v-if="CarregaUsuarios">
                <thead >
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Email</th>
                        <th scope="col">Cep</th>
                        <th scope="col" class="text-start">Status</th>  
                    </tr>
                </thead>
                <tbody style="margin-top: 10px;" >
                    <tr v-for="usuario in slicedItems" :key="usuario.id">
                        <th scope="row">{{ usuario.id }}</th>
                        <td>{{ usuario.nome }}</td>
                        <td>{{ usuario.email }}</td>
                        <td>{{ usuario.cep }}</td>
                        <td >
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"
                                    :checked="usuario.statusConta" @change="toggleStatus(usuario)">
                            </div>
                            
                        </td>
                    </tr>
                </tbody>
                
            </table>
            <table class="container table-light table-hover text-center" v-if="!CarregaUsuarios && listaContas.length > 0">
                <thead>
                    <th scope="col">ID</th>
                    <th scope="col" class="text-start">Empresa</th>
                    <th scope="col" class="text-start">Email</th>
                    <th scope="col" class="text-start">Cep</th>     
                    <th scope="col" class="text-start">Status</th>   
                </thead>
                <tbody style="margin-top: 10px;">
                    <tr v-for="usuario in slicedItems" :key="usuario.id">
                        <th scope="row">{{ usuario.id }}</th>
                        <td class="text-start"> <img :src="usuario.logotipo || ''" style="max-width: 30px; max-height: 30px;margin-right: 1rem;"> {{ usuario.nome }}</td>
                        <td class="text-start">{{ usuario.email }}</td>
                        <td class="text-start">{{ usuario.cep }}</td>
                        <td class="text-start">
                            <div class="form-check form-switch ">
                            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"
                            :checked="usuario.statusConta" @change="toggleStatus(usuario)"
                            >
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
       </div>
        
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
    </div>
   
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import Navbar from '../components/HeaderTemplate.vue'
    import api from '@/http'
    import Cookies from 'js-cookie'
    import Swal from 'sweetalert2';
    import RegFornecedor from '@/components/modal/RegistrarFornecedorModal.vue'
    export default defineComponent({
        name: "ControleContas",
        components: {
            Navbar,
            RegFornecedor
        },
        data() {
            return{
                listaContas: [],
                currentPage: 1,
                itemsPerPage: 10,
                totalPages: 0,
                CarregaUsuarios: true,
            }
        },
        computed: {
            slicedItems(): any [] {
                const start = (this.currentPage - 1) * this.itemsPerPage;
                const end = start + this.itemsPerPage;
                return this.listaContas.slice(start, end);
            },
            
            tipoConta() : string{
                if(this.CarregaUsuarios){
                    return 'Clientes'
                }else{
                    return 'Fornecedores'
                }
            }
            
        },
        methods: {
            async getListaCliente() {
                const token = Cookies.get("token");
                const headers = {
                    Authorization: `Bearer ${token}`,
                };
                const config = {
                    headers: headers,
                };
                await api.get('admin/get-all-consumidor', config)
                    .then((response) => {
                    this.listaContas = response.data;
                    this.totalPages = Math.ceil(this.listaContas.length / this.itemsPerPage);
                    })
                    .catch((error) => {
                    console.log(error);
                    });
            },

            async getListaFornec() {
                const token = Cookies.get("token");
                const headers = {
                    Authorization: `Bearer ${token}`,
                };
                const config = {
                    headers: headers,
                };
                await api.get('admin/get-all-fornecedor', config) // alterado para 'admin/get-all-fornecedor' para buscar fornecedores
                    .then((response) => {
                    this.listaContas = response.data;
                    this.totalPages = Math.ceil(this.listaContas.length / this.itemsPerPage);
                    })
                    .catch((error) => {
                    console.log(error);
                    });
            },

            async bloquearConta(usuario : any){
                const token = Cookies.get("token");
                const headers = {
                    Authorization: `Bearer ${token}`,
                };
                const config = {
                    headers: headers,
                };
                if(this.CarregaUsuarios){
                    await api.put('consumidor/update/',
                    {
                        email: usuario.email,
                        statusConta: usuario.statusConta ? 1 : 0 
                    }, config)
                    .then((response) => {
                        if(usuario.statusConta){
                            Swal.fire({
                            title: 'Cliente desbloqueado',
                            text: 'Conta desbloqueada com sucesso',
                            icon: 'success',
                        });
                        }
                        else{
                            Swal.fire({
                                title: 'Cliente bloqueado',
                                text: 'Conta bloqueada com sucesso',
                                icon: 'error',
                            });
                        }
                    })
                    .catch((error) => {
                        Swal.fire({
                            title: 'Erro',
                            text: 'Não foi possível bloquear a conta',
                            icon: 'error',
                        });
                        console.log(error)
                    })
                }
                else{
                    await api.put('fornecedor/update/' + usuario.id,
                    {
                        nome: usuario.nome,
                        statusConta: usuario.statusConta ? 1 : 0 
                    }, config)
                    .then((response) => {
                        if(usuario.statusConta){
                            Swal.fire({
                            title: 'Fornecedor desbloqueado',
                            text: 'Conta desbloqueada com sucesso',
                            icon: 'success',
                        });
                        }
                        else{
                            Swal.fire({
                                title: 'Fornecedor bloqueado',
                                text: 'Conta bloqueada com sucesso',
                                icon: 'error',
                            });
                        }
                        
                    })
                    .catch((error) => {
                        console.log(error)
                    })
                }
                
            },
            CarregarFornecedores(){
                this.listaContas = [];
                this.CarregaUsuarios = false; // alterado para true para exibir a tabela de fornecedores
                this.getListaFornec();
            },
            CarregarClientes(){
                this.listaContas = [];
                this.CarregaUsuarios = true; // alterado para false para exibir a tabela de clientes
                this.getListaCliente();
            },
            toggleStatus(usuario : any) {
                usuario.statusConta = !usuario.statusConta;
                this.bloquearConta(usuario)
            }

        },
        mounted() {
            this.CarregaUsuarios = true
            this.getListaCliente()
            
        },
        watch: {
            lista() {
                this.totalPages = Math.ceil(this.listaContas.length / this.itemsPerPage);
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
   
    .btn-success {
        background-color: green;
        /* Estilos adicionais para o botão verde */
      }
    
      .btn-danger {
        background-color: red;
        /* Estilos adicionais para o botão vermelho */
      }
      .custom-checkbox {
        box-shadow: none;
      }
</style>
