<template>
    <header>
    <!--NAVBAR-->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark text-light fixed-top mb-5">
            <div class="container-fluid p-2">
                <a class="navbar-brand pe-5 text-warning" href="#">&nbsp;PreçoPoint&nbsp; <i class="fa-solid fa-location-dot"></i></a>
                <!--Botão para aparecer opções quando tela estiVer em proporção pequena-->
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item  pe-3">
                            <a class="nav-link hover" aria-current="page" href="/" >
                                <i class="fa-solid fa-house"></i>&nbsp;&nbsp;Home &nbsp;
                            </a>
                        </li>
                        <li class="nav-item dropdown  pe-3">
                            <a class="nav-link dropdown-toggle hover" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="fa-solid fa-tags"></i>&nbsp;&nbsp;Categoria &nbsp;
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown" v-if="categorias.length != 0">
                                <li v-for="(categoria, index) in categorias" :key="index" >
                                    <a class="dropdown-item" @click="getProdutosByCategoria(categoria.id,categoria.categoria)"> 
                                        {{ categoria.categoria }}
                                    </a>
                                </li>
                            </ul>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown" v-if="categorias.length == 0">
                                <li class="text-center">
                                  <label>Sem Categorias</label>
                                </li>
                            </ul>
                        </li>
                        <li class="nav-item dropdown  pe-3" v-if="hasRoleConsumidor()">
                            <a class="nav-link dropdown-toggle hover" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="fa-solid fa-list"></i>&nbsp;&nbsp;Suas listas&nbsp;
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown" v-if="listas.length != 0">
                                <li v-for="(item, index) in listas" :key="index">
                                    <router-link class="dropdown-item" :to="{ name: 'ListaProduto'}"  v-on:click="carregarListaProdutos((item.id).toString(), item.nomeLista)"> {{ item.nomeLista }}</router-link>
                                </li>
                                <li><hr class="dropdown-divider"></li>
                                <li>
                                    <router-link class="dropdown-item" :to="{ name: 'ListaUsuario'}" ><i class="fa-solid fa-plus"></i> &nbsp;Criar lista</router-link>
                                </li>
                                
                            </ul>   
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown" v-if="listas.length == 0">
                                <li class="text-center">
                                  <label>Sem Listas</label>
                                </li>

                                <li><hr class="dropdown-divider"></li>
                                <li>
                                    <router-link class="dropdown-item" :to="{ name: 'ListaUsuario'}" ><i class="fa-solid fa-plus"></i> &nbsp;Criar lista</router-link>
                                </li>
                            </ul>    
                        </li>
                        <li class="nav-item">
                            <div class="d-flex form-group">
                                <input v-model="produtoPesquisado" class="form-control me-2" type="text" placeholder="Pesquisar produto..." aria-label="Search">
                                <button class="btn btn-outline-warning"  @click="pesquisarProduto"><i class="fa-solid fa-magnifying-glass"></i></button>
                            
                 
                            </div>
                        </li>
                    </ul>
                    <div class="dropdown pe-4">
                        <a href="" class=" nav-link nav-item dropdown-toggle hover" id="navbarDropdown2" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fa-solid fa-user" height="30px" width="30px"></i>&nbsp;
                            Opções usuário    
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown2">
                            <li v-if="justHasRoleFornecedor()"><router-link class="dropdown-item" to="/editar-fornecedor"><i class="fa-solid fa-user-tag fa-lg"></i> Minha conta</router-link></li>
                            <li v-if="justHasRoleConsumidor()"><router-link class="dropdown-item" to="/editar-consumidor"><i class="fa-solid fa-user-tag fa-lg"></i> Minha conta</router-link></li>
                            <li v-if="hasRoleConsumidor()"><a class="dropdown-item" href="/listas"><i class="fa-solid fa-table-list fa-lg"></i> Minhas Listas</a></li>
                            <li v-if="hasRoleFornecedor()"><a class="dropdown-item" href="/produtos-fornecedor"><i class="fa-solid fa-table-list fa-lg"></i> Gerenciar Produtos</a></li>
                            <li v-if="hasRoleFornecedor()"><a class="dropdown-item" href="/cadastrar-produto"><i class="fa-solid fa-circle-plus fa-lg"></i> Cadastrar produto</a></li>
                            <li v-if="hasRoleAdministrador()"><a class="dropdown-item" href="/admin/gerenciar-contas"><i class="fa-solid fa-people-roof fa-lg"></i> Gerenciar contas</a></li>
                            <li v-if="hasRoleAdministrador()"><a class="dropdown-item" href="/admin/logs"><i class="fa-solid fa-table-list fa-lg"></i> Logs do sistema</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li v-if="usuarioLogado()"><a class="dropdown-item" @click="sair" href="/login"><i class="fa-solid fa-arrow-right-from-bracket justify-content-end"></i> &nbsp;Sair </a></li>
                            <li v-if="!usuarioLogado()"><a class="dropdown-item" @click="entrar" href="/login"><i class="fa-solid fa-arrow-right-from-bracket justify-content-end"></i> &nbsp;Entrar </a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
         <!-- Espaçamento para correção do navbar fixed-tp -->
         <div class="" style="margin-top: 80px;"></div>
        
    </header>
</template>

<script lang="ts">
import Cookies from "js-cookie"
import { defineComponent } from "vue"
import ILista from "../interfaces/ILista"
import api from "@/http"
import ICategoria from "@/interfaces/ICategoria"
import IProduto from '@/interfaces/IProduto'
import router from "@/router"
import jwt_decode from 'jwt-decode'

    export default defineComponent({
        name: "HeaderTemplate",       
        data () {
            return{
                produtoPesquisado: '',
                listas: [] as ILista[],
                categorias:[] as ICategoria[],
                produtosByCategoria: [] as IProduto[],
                userRoles: [] as string[],
            }
        },

        created(){
            const token = Cookies.get('token') as string
            if(token){
                const decodedToken = jwt_decode(token) as { roles: string[] };
                this.userRoles = decodedToken.roles
                if(this.hasRoleConsumidor()){
                    this.getListas()
                }
            }  
            this.getCategorias()
        },
        methods:{
            carregarListaProdutos(id : string, nomeLista: string){
                Cookies.set('lista', id , {secure:true, httpOnly: false})
                Cookies.set('nomeLista', nomeLista, {secure:true, httpOnly: false})
                if(this.$route.path === '/lista-de-produtos'){
                    setTimeout(() => {
                        window.location.reload();
                    }, 100); // Aguarde 100 milissegundos (ajuste conforme necessário)
                }     
            },
            getListas(){   
                const token = Cookies.get("token")
                const headers = {
                    'Authorization': `Bearer ${token}`
                };
                if (token){
                    api.get("lista/getlista-consumidor/" + Cookies.get("email"),
                    { headers }
                    )
                    .then(response => {
                        const data = response.data;
                        this.listas = data;
                    })
                    .catch(error => {
                        console.log('Erro:', error);
                    });
                }   
            },       
            async getCategorias() {
                await api.get("filtro/get-categorias")
                .then((response) => this.categorias = response.data)
                .catch((err) => console.log("Erro: " + err));
            },
            async getProdutosByCategoria(idCategoria:number, nomeCategoria:string){
                await api.get('filtro/list-produtos-by-categoria/'+ idCategoria)
                .then((response) => {
                    if (this.$route.name !== 'Home') {
                        this.$router.replace({ name: 'Home' });
                        localStorage.setItem('categoriaId',  idCategoria.toString());
                        localStorage.setItem('nomeCategoria', nomeCategoria);
                    }
                    else {
                        this.produtosByCategoria = response.data;
                        this.$emit('produtos-by-categoria', { produtos: this.produtosByCategoria, nome: nomeCategoria} );
                    }    
                })  
                .catch((error) => console.log(error));  
            },
            pesquisarProduto() {
                if (this.produtoPesquisado.trim() !== '') {
                    // Redirecionar para a página Home caso não esteja nela
                    if (this.$route.name !== 'Home') {
                        this.$router.replace({ name: 'Home' });
                    }
                    localStorage.setItem('produtoPesquisado', this.produtoPesquisado);
                    this.$emit('produto-pesquisado', this.produtoPesquisado);
                }
            },
            sair(){
                Cookies.remove('token');
                Cookies.remove('email');
                localStorage.removeItem('carrinho')
                router.push('/login');
            }, 
            entrar(){
                router.push('/login');
            }, 
            hasRoleConsumidor(): boolean {
                return this.userRoles.includes('ROLE_CONSUMIDOR') || this.userRoles.includes('ROLE_ADMINISTRADOR');
            },
            hasRoleFornecedor(): boolean {
                return this.userRoles.includes('ROLE_FORNECEDOR') || this.userRoles.includes('ROLE_ADMINISTRADOR');
            },
            hasRoleAdministrador(): boolean {
                return this.userRoles.includes('ROLE_ADMINISTRADOR');
            },
            justHasRoleConsumidor(): boolean {
                return this.userRoles.includes('ROLE_CONSUMIDOR')
            },
            justHasRoleFornecedor(): boolean {
                return this.userRoles.includes('ROLE_FORNECEDOR')
            },
            usuarioLogado(): boolean {
                if(Cookies.get('token')){
                    return true;
                }
                return false;
            }
        }
    })
</script>

<style scoped>
  .hover{
    color: white;
  }
  .hover:hover{
    color:#ffc107;
  }
</style>
