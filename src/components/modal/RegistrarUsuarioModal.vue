<template>
            <!--Button Consumer-->
            <button type="button" class="btn btn-danger shadow btn-sm" data-bs-toggle="modal" data-bs-target="#btnConsumer">Cliente</button>

            <!-- Modal - CONSUMIDOR-->
            <div class="modal fade" id="btnConsumer" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                        <div class="modal-header border-0">
                            <!--Button Close-->
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                        <!--Form CONSUMIDOR-->
                        <div class="row justify-content-center">
                            <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                <!-- Text -->
                                <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up at <span class="h2 text-danger fw-bold">Preço Point</span></p>
                                <!-- Form -->
                                <form class="mx-1 mx-md-4" @submit.prevent="criarUsuario">
                                    <div class="d-flex flex-row align-items-center mb-4 icon-input">
                                        <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                                        <div class="form-outline flex-fill mb-0">
                                            <input type="text" id="form3Example1c" class="form-control" v-model="nomeUsuario" />
                                            <label class="form-label" for="form3Example1c">Nome do Usuário</label>
                                        </div>
                                    </div>
                        
                                    <div class="d-flex flex-row align-items-center mb-4 icon-input">
                                        <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                        <div class="form-outline flex-fill mb-0">
                                            <input type="email" id="form3Example3c" class="form-control" v-model="email"/>
                                            <label class="form-label" for="form3Example3c">Seu Email</label>
                                        </div>
                                    </div>
                        
                                    <div class="d-flex flex-row align-items-center mb-4 icon-input" >
                                        <i class="fa-solid fa-phone me-3 fa-fw"></i>
                                        <div class="form-outline flex-fill mb-0">
                                            <input type="tel" id="form3Example7c" class="form-control" v-model="endereco" />
                                            <label class="form-label" for="form3Example7c">Endereço</label>
                                        </div>
                                    </div>
                        
                                    <div class="d-flex flex-row align-items-center mb-4 icon-input">
                                        <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                                        <div class="form-outline flex-fill mb-0">
                                            <input type="password" id="form3Example8c" class="form-control" v-model="senha" />
                                            <label class="form-label" for="form3Example8c">Senha</label>
                                        </div>
                                    </div>
                        
                                    <div class="d-flex flex-row align-items-center mb-4 icon-input">
                                        <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                                        <div class="form-outline flex-fill mb-0">
                                            <input type="password" id="form3Example9cd" class="form-control" v-model="rsenha" />
                                            <label class="form-label" for="form3Example9cd">Repetir Senha</label>
                                        </div>
                                    </div>
                        
                                    <div class="form-check d-flex justify-content-center mb-5">
                                        <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3c" v-model="agreement"/>
                                        <label class="form-check-label" for="form2Example3c">
                                            Concordo com os <a href="#!">Termos de Serviço</a>
                                        </label>
                                    </div>
                        
                                    <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                        <button type="button" class="btn btn-primary btn-lg shadow" @click="criarUsuario">Registrar</button>
                                    </div>
                                </form>
                            </div>
                            <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                <img src="@/assets/Queue-amico.svg" class="img-fluid" alt="Sample image">
                            </div>
                        </div>
                        
                        </div>
                    </div>
                </div>   
            </div>
</template>

<script lang="ts">
import api from '@/http';
import Cookies from 'js-cookie';
import { defineComponent } from 'vue';


    export default defineComponent({
        name: "RegUsuario",
        data(){
            return{
                nomeUsuario: "",
                email: "",
                endereco:"",
                senha:"",
                rsenha:"",
                agreement: false
            }
            
        }, 
        created(){
            this.clear()
        },
        methods:{
            clear(){
                this.nomeUsuario= ""
                this.email= ""
                this.endereco=""
                this.senha=""
                this.rsenha=""
                this.agreement= false
            },
            async criarUsuario(){
                if (this.agreement){
                    await api.post('cadastro/consumidor',
                    {
                        nome: this.nomeUsuario,
                        email: this.email,
                        senha: this.senha,
                        endereco: this.endereco
                    },
                    {
                        headers: {
                            
                        }
                    })
                    .then((response) => {
                        this.atualizacaoBemSucedida()
                    })
                    .catch((error) => {
                        if (error.response && error.response.status === 400) {
                        // Ocorreu um erro de Bad Request (400)
                            const errorData = error.response.data;
                            if (Array.isArray(errorData) && errorData.length > 0) {
                                let errorMessage = 'Os seguintes campos devem ser preenchidos:';
                                errorData.forEach((errorItem) => {
                                    const field = errorItem.field;
                                    const errorMessageItem = errorItem.errorMessage;
                                    errorMessage += '\n- O campo: ' + field + ' ' + errorMessageItem;
                                });

                                alert(errorMessage);
                            } else {
                                console.log('Erro de Bad Request (400):', errorData);
                            }
                        } else {
                            // Outro tipo de erro ocorreu
                            console.log('Erro:', error.message);
                        }
                    })
                }else{
                    alert('Necessario aceitar os termos de uso.')
                }
            },
            atualizacaoBemSucedida(){
                this.nomeUsuario = ""
                this.email = ""
                this.senha = ""
                this.rsenha = ""
                this.endereco = ""
                this.agreement = false
                alert('Atualização de produto bem sucedida');
            }
        }
    })
</script>


<style>
    .icon-input i {
        margin-top: -35px; /* Adjust this value to move the icons up or down */
    }

</style>
