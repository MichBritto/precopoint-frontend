<template>
    <Navbar></Navbar>
    <!--Body-->

    <div class="container"  >
        <!--                                   Header Body                                                  -->
       
        <div class="row">
            <div class="col">
                <div class="d-flex justify-content-between mt-4 mb-4" >
                    <p></p>
                    <div class="text-center mx-auto "> <span class="h1 text-warning fw-bold" >Listas</span></div>
                    <button type="button" class="btn btn-dark hover" @click="abrirModal">Criar Lista&nbsp;&nbsp;<i class="fa-solid fa-plus"></i></button>
                    
                </div>
               
            </div>
        </div> 
        <hr>    
                       
        <div class="row" >
            <div class="col-lg-4 mb-4 d-flex align-items-lg-center mt-5 " v-for="(lista, index) in listas" :key="index" >
                <div class="card shadow me-5">
                        
                        <div class="card-body border" style="width: 18rem; height: 10rem">
                            <h6 class="fw-bold text-muted text-center " style="font-size: 20px">{{ lista.nomeLista }}</h6>
                            <div class="container text-center mt-4 ">
                                <router-link :to="{ name: 'ListaProduto'}">
                                    <button class="btn btn-warning" @click="carregarListaProdutos((lista.id).toString(), lista.nomeLista)">Editar&nbsp;&nbsp;<i class="fa-solid fa-pen-to-square"></i></button>
                                </router-link>
                                <button class="btn btn-danger ms-2" @click="excluirLista(lista.id)">Excluir&nbsp;&nbsp;<i class="fa-solid fa-trash"></i></button>
                            </div>
                        </div>
                    </div>  
            </div> 
            
            <div v-if="listas.length == 0" class="d-flex align-items-center justify-content-center" style="height: 50vh;">
                <span class="h4 text-muted">Nenhuma lista foi encontrada</span>
              </div>           
        </div>
        
          
    </div>

    <!--                                 Modal para criar Lista                                                -->
    <div v-if="showModal" class="modal-overlay">
        <div class="card col-6 mx-auto">
            <div class="card-body">
                <h2 class="card-title text-center h1 text-warning fw-bold mb-5">Criar uma Lista</h2>
                <form @submit.prevent="criarLista">
                                       
                    <!-- descricao -->  
                    <div class="mb-3">  

                        
                        <input type="text" v-model="nomeLista" placeholder="Nome da Lista" class="form-control">
                        <div class="text-center mt-5">
                            <button class="btn btn-dark ms-2 text-center">Criar Lista</button>
                            <button class="btn btn-danger" @click="showModal = false;nomeLista= ''">Cancelar</button>
                        </div>
                        
                    </div>
                    
                </form>
            </div>
            
        </div>
    </div>
    

</template>

<script lang="ts">
import { defineComponent } from "vue";
import ILista from "@/interfaces/ILista";
import Cookies from "js-cookie";
import Navbar from "../components/HeaderTemplate.vue"
import api from "@/http";
import Swal from "sweetalert2";

   

    export default defineComponent({
        name: "ListaUsuario",
        components:{
            Navbar,

        },
        
        data(){
            return{
                listas: [] as ILista[],
                showModal: false,
                nomeLista: '',
                
            }
        },
        setup() {
            async function getListas(componentInstance: any): Promise<void> {
               
                const token = Cookies.get("token");
                const headers = {
                    Authorization: `Bearer ${token}`,
                };

                try {
                    const response = await api.get(
                        "lista/getlista-consumidor/" + Cookies.get("email"),
                        { headers }
                    );

                    const listas: ILista[] = response.data.map((lista: any) => ({
                        id: lista.id,
                        nomeLista: lista.nomeLista,
                    }));
                    componentInstance.listas = listas;
                    console.log(componentInstance.listas);
                } catch (error) {
                    console.log("Erro:", error);
                }
            }


            return {
            getListas,
            };
        },
        created(){
            
            this.getListas(this)
            
        },
        methods:{
            carregarListaProdutos(id : string, nomeLista: string){
                Cookies.set('lista', id , {secure:true, httpOnly: false})
                Cookies.set('nomeLista', nomeLista, {secure:true, httpOnly: false})
            },
            closeModal() {
                this.showModal = false;
            },
            abrirModal(){
                if(Cookies.get('token')){
                    this.showModal = true
                }else{
                    Swal.fire({
                        title: 'Erro',
                        text: 'Necessario estar logado para criar uma lista',
                        icon: 'error',
                    });
                }            
            },
            async criarLista() {
                // Lógica para criar a lista de produtos com o nome inserido
                // Pode enviar os dados para o backend ou fazer outras operações necessárias
                if(this.nomeLista.length <= 35 && this.nomeLista.length >= 4){
                    await api.post('lista/criarlista/',
                    {
                        nomeLista: this.nomeLista,
                        emailConsumidor: Cookies.get('email')
                    },
                    {
                        headers: {
                            Authorization: 'Bearer '+ Cookies.get('token')
                        }
                    })
                    .then((response) => {
                        this.closeModal();
                        Swal.fire({
                            title: 'Sucesso!',
                            text: 'Lista ->' + this.nomeLista + ' criada com sucesso!',
                            icon: 'success',
                            allowOutsideClick: false,
                            confirmButtonText: 'OK',
                        }).then((result) => {
                                if (result.isConfirmed) {
                                    // Chame sua função aqui
                                    this.clear()
                                    
                                    window.location.reload();
                                }
                                });
                        
                    })
                    .catch((error) => {
                        console.log(error)
                        this.closeModal();
                        Swal.fire({
                            title: 'Não foi possível criar lista',
                            text: error.response.data.errorMessage,
                            icon: 'error',
                            allowOutsideClick: false,
                            confirmButtonText: 'OK',
                        }).then((result) => {
                                if (result.isConfirmed) {
                                    // Chame sua função aqui
                                    
                                    this.clear()
                                    
                                }
                                });
                        
                    })
                    // Fechar o modal após criar a lista, se necessário
                    
                    
                }else{
                    if(this.nomeLista.length <= 35){
                        this.closeModal()
                        Swal.fire({
                            title: 'Falha',
                            text: 'Nome da lista deve conter pelo menos 4 caracteres',
                            icon: 'error',
                            allowOutsideClick: false,
                            confirmButtonText: 'OK',
                        }).then((result) => {
                                if (result.isConfirmed) {
                                    // Chame sua função aqui
                                    this.abrirModal()
                                }
                                });
                    }
                    else{
                        this.closeModal()
                        Swal.fire({
                        title: 'Falha',
                        text: 'Nome da lista deve conter no maximo 35 caracteres',
                        icon: 'error',
                        allowOutsideClick: false,
                        confirmButtonText: 'OK',
                        }).then((result) => {
                                if (result.isConfirmed) {
                                    // Chame sua função aqui
                                    this.abrirModal()
                                }
                                });
                    }
                    
                }
                
            },
            clear(){
                this.nomeLista ='' 
            },
            async excluirLista(listaId:number){
                Swal.fire({
                    title: 'Excluir lista de usuário',
                    text: 'Deseja realmente excluir a lista?',
                    icon: 'question',
                    allowOutsideClick: false,
                    confirmButtonText: 'OK',
                    confirmButtonColor: "#28a745",
                    cancelButtonColor:"#dc3545",
                    showCancelButton: true
                    }).then((result) => {
                        if (result.isConfirmed) {
                            // Chame sua função aqui
                            api.delete('lista/delete/'+listaId,
                            {
                                headers: {
                                    Authorization: 'Bearer '+ Cookies.get('token')
                                }
                            })
                            .then(() => {
                                Swal.fire({
                                    title: 'Sucesso!',
                                    text: 'Lista excluida com sucesso!',
                                    icon: 'success',
                                })
                                setTimeout(() => {
                                    window.location.reload();
                                },1000)
                                
                            })
                            .catch((error) => {
                                Swal.fire({
                                    title: 'Excluir lista de usuário',
                                    text: error.response.data.errorMessage,
                                    icon: 'success',
                                })
                            })
                        }
                    }); 
            }
        },
            
           
        
    })
</script>
    
<style scoped>
    button {
            display: inline-block;
            text-align: center;
            transition: all 0.5s;
            cursor: pointer;
            margin: 5px;
            color: whitesmoke;
        }
        button span { 
            cursor: pointer;
            display: inline-block;
            position: relative;
            transition: 0.5s;
        }
        button span:after {
            content: '\00bb';
            position: absolute;
            opacity: 0;
            top: 0;
            right: -20px;
            transition: 0.5s;
        }
        button:hover {
           color: white;
           opacity: 0.75;
        }
        button:hover span {
            padding-right: 25px;
        }
        button:hover span:after {
            opacity: 1;
            right: 0;
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