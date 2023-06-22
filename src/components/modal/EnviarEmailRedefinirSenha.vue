<template>
<!--Button Consumer-->

<a class="text-body" style="cursor: pointer" data-bs-toggle="modal" data-bs-target="#btnRedefinirSenha">Esqueceu sua senha?</a>

<!-- Modal -->
<div class="modal fade" id="btnRedefinirSenha" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"  ref="modalRedefinirSenha">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header border-0">
                <!--Button Close-->
                <button ref="closeButton" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body text-center">
                <span class="h3 text-warning">Redefinição de senha <i class="fa-solid fa-lock"></i></span>
                <hr/>
                <span class="h5 mb-2">Insira abaixo seu e-mail para que possamos enviar um link para você atualizar sua senha!</span>
                <div class="mt-4">
                    <input v-model="v$.email.$model" :class="{'is-invalid' : v$.email.$errors.length}" type="email" id="emailRedefinirSenha" class="form-control form-control-lg" placeholder="Insira seu endereço de e-mail..." />
                    <div class="text-danger " v-for="error in v$.email.$errors" :key="error.$uid">
                        <span> • {{ error.$message }}</span>
                    </div>
                </div>
                <div class="mt-3">
                    <button type="button" class="btn btn-outline-primary btn-lg" @click="enviarEmailRecuperacaoSenha()">Enviar <i class="fa-solid fa-paper-plane"></i></button>
                </div>
            </div>
        </div>
    </div>   
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Swal from 'sweetalert2'
import api from "@/http"
import { useVuelidate } from '@vuelidate/core'
import { required, email, helpers } from '@vuelidate/validators'
import Cookies from 'js-cookie';

export default defineComponent({
    name:'EnviarEmailRedefinirSenha',
    data() {
        return {
            email:'',
        }
    },
    setup() {
        return { v$: useVuelidate() };
    },
    validations() {
        return {
            email: {
                required: helpers.withMessage('Campo obrigatório', required),
                email: helpers.withMessage('E-mail inválido',email)
            },
        }
    },
    methods: {
        validarEmail(): boolean {
            if(this.email.trim() !== ''){
                return true;
            }
            else{
                return false;
            }
        },
        validarFormatoEmail(): boolean {
            if(!this.v$.email.$errors.length){
                //email tem um formato correto
                return true;
            }
            else{
                return false;
            }
        },
        async enviarEmailRecuperacaoSenha() {
            if(!this.validarEmail()){
                Swal.fire({
                    title: 'Ops... campo de e-mail vazio!',
                    text: 'Você precisa preencher o campo de e-mail para prosseguir',
                    icon: 'warning',
                });
                return
            }
            if(!this.validarFormatoEmail()){
                Swal.fire({
                    title: 'Ops... formato de e-mail inválido!',
                    text: 'O e-mail precisa ter um formato válido, verifique-o e tente novamente',
                    icon: 'warning',
                });
                console.log('formato esta invalido');
                return
            }
            Swal.fire({
                title: 'Aguarde...',
                text: 'Estamos te enviando um e-mail para redefinir sua senha',
                allowOutsideClick: false,
                allowEscapeKey: false,
                didOpen: () => {
                    Swal.showLoading();
                    api.get('email/enviar-recuperacao-senha/'+ this.email)
                    .then(() => {
                        Cookies.set('emailRedefinicao',this.email);
                        this.email = '';
                        Swal.close();
                        setTimeout(() => {
                            Swal.fire({
                                title: 'E-mail enviado com sucesso!',
                                text: "Um e-mail de redefinição de senha foi enviado para: " + Cookies.get('emailRedefinicao') +", acesse e redefina sua senha!",
                                icon: 'success',
                            });
                        },1000)
                        
                        //fechar modal
                        const closeButton = this.$refs.closeButton as HTMLButtonElement
                        closeButton.click()
                    })
                    .catch((error) => {
                        Swal.fire({
                            title: 'Ops... erro ao enviar e-mail',
                            text: 'Um erro aconteceu ao tentar enviar e-mail, erro: ' + error.response.data.errorMessage,
                            icon: 'error',
                        });
                    })
                }
            })
        }
    }
})

</script>

<style scoped>
</style>