<template>
<div class="container vh-100 d-flex align-items-center justify-content-center">
    <div class="card text-center shadow">
      <span class=" h3 text-warning">&nbsp;PreçoPoint&nbsp; <i class="fa-solid fa-location-dot"></i></span>
      <div class="card-body text-center">
        <h4 class="card-title ">Redefinição de senha <i class="fa-solid fa-lock"></i></h4>
        <span class="fs-5 mb-2">Insira e confirme sua nova senha abaixo!</span>
        <div class="mt-4">
            <input v-model="v$.senha.$model" :class="{'is-invalid' : v$.senha.$errors.length}" type="password" id="novaSenha" class="form-control form-control-lg" placeholder="Insira seu nova senha..." />
            <div class="text-danger " v-for="error in v$.senha.$errors" :key="error.$uid">
                <span> • {{ error.$message }}</span>
            </div>
        </div>
        <div class="mt-4">
            <input v-model="v$.confirmarSenha.$model" :class="{'is-invalid' : v$.confirmarSenha.$errors.length}" type="password" id="emailRedefinirSenha" class="form-control form-control-lg" placeholder="Confirme sua senha..." />
            <div class="text-danger " v-for="error in v$.confirmarSenha.$errors" :key="error.$uid">
                <span> • {{ error.$message }}</span>
            </div>
        </div>
        <div class="mt-3">
            <button type="button" class="btn btn-outline-primary btn-lg" @click="recuperarSenha()">Redefinir <i class="fa-sharp fa-solid fa-pen-to-square"></i></button>
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
import { required, helpers } from '@vuelidate/validators'
import passwordValidator from 'password-validator';
import Cookies from 'js-cookie';

export default defineComponent({
    name:'RedefinirSenha',
    data() {
        return {
            senha:'',
            confirmarSenha:''
        }
    },
    setup() {
        return { v$: useVuelidate() };
    },
    validations() {
        return {
            senha: {
                required: helpers.withMessage('Campo obrigatório', required),
            },
            confirmarSenha: {
                required: helpers.withMessage('Campo obrigatório', required),
            },
        }
    },
    methods: {
        validadorSenha(senha:string): boolean {
            const passwordSchema = new passwordValidator()
            passwordSchema
                .is().min(8)                                 // Mínimo de 8 caracteres
                .has().uppercase()                           // Deve ter letras maiúsculas
                .has().lowercase()                           // Deve ter letras minúsculas
                .has().digits()                              // Deve ter números
                .has().symbols();                            // Deve ter caracteres especiais
            return passwordSchema.validate(senha) as boolean;
        },
        validarCamposEmBranco(): boolean {
            if(this.senha.trim() !== '' && this.confirmarSenha.trim() !== ''){
                return true;
            }
            else{
                return false;
            }
        },
        async recuperarSenha() {
            if(!this.validarCamposEmBranco()){
                Swal.fire({
                    title: 'Ops... existem campos vazios',
                    text: 'Você precisa preencher todos os campos para prosseguir',
                    icon: 'warning',
                });
                return;
            }
            if(this.senha !== this.confirmarSenha){
                Swal.fire({
                    title: 'Ops... senhas não correspondem!',
                    text: 'Campos Senha e Confirmar Senha não correspondem, verifique e tente novamente.',
                    icon: 'warning',
                });
                return;
            }
            if(!this.validadorSenha(this.senha)){
                Swal.fire({
                    title: 'Ops... revise sua senha!',
                    html: 'Para garantir a segurança de sua conta, precisamos que você siga este modelo:<ul><li>Ao menos 8 caractéres</li><li>Ao menos uma letra minúscula</li><li>Ao menos uma letra maiúscula</li><li>Ao menos um caractere especial: #,$,% etc.</li><li>Ao menos um número</li></ul>',
                    icon: 'warning',
                });
                return;
            }
            Swal.fire({
                title: 'Aguarde...',
                text: 'Estamos redefinindo sua senha',
                allowOutsideClick: false,
                allowEscapeKey: false,
                didOpen: () => {
                    Swal.showLoading();
                    api.put('email/redefinir-senha/'+ Cookies.get('emailRedefinicao'),
                    {
                        novaSenha:this.senha
                    })
                    .then(() => {
                        Cookies.remove('emailRedefinicao');
                        Cookies.remove('token');
                        Cookies.remove('email');
                        this.senha = '';
                        this.confirmarSenha = '';
                        Swal.close();
                        setTimeout(() => {
                            Swal.fire({
                                title: 'Senha atualizada com sucesso',
                                text: "A atualização foi bem-sucedida, faça login no Preço Point e desfrute de nossos recursos!",
                                icon: 'success',
                            });
                        },1000)
                        this.$router.push('/login');
                    })
                    .catch((error) => {
                        if(error.response.status === 404){
                            Swal.fire({
                                title: 'Ops... erro ao redefinir senha',
                                text: 'O e-mail não foi encontrado, caso você tenha acabado de atualizar sua senha, será necessário enviar outra solicitação de atualização',
                                icon: 'error',
                            });
                        } else {
                            Swal.fire({
                                title: 'Ops... erro ao redefinir senha',
                                text: "Um erro ocorreu: '"+ error.response.data.errorMessage +"', tente novamente. Se o erro persistir entre em contato conosco por meio do e-mail 'precopoint@gmail.com'",
                                icon: 'error',
                            });
                        }
                    })
                }
            })
        }
    }
})

</script>

<style scoped>
</style>