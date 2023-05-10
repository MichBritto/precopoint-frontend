<template>
    <body class="background">
    <section class="vh-100 ">
        <div class="container-fluid h-custom">
            <div class="row d-flex justify-content-center align-items-center h-100 ">
                          
                <!---------------------------------------------------------------------------------------------------->
                                                <!--Left-Content-->
                <!----------------------------------------------------------------------------------------------------> 
                <div class="col-md-9 col-lg-6 col-xl-5">
                    <img src="@/assets/rafiki_login.svg" class="img-fluid" alt="Sample image">
                </div>

                <!---------------------------------------------------------------------------------------------------->
                                                <!--Right-Content-->
                <!---------------------------------------------------------------------------------------------------->    
                <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                    
                
                    <form method="post" @submit.prevent="validaUsuario()">
                        <hr class="fw-bold text-danger">
                        <div class="h1">Preço Point</div>
                        <hr class="text-danger">
                        <!--E-mail input-->
                        <div class="form-outline mb-4">
                            <label class="form-label h6" for="email-input">E-mail address</label>
                            <input v-model="email" type="email" id="email-input" class="form-control form-control-lg" placeholder="Enter a valid email address" />
                        </div>
                        <!--Password input-->
                        <div class="form-outline mb-4">
                            <label class="form-label h6" for="password-input">Password</label>
                            <input v-model="senha" type="password" id="password-input" class="form-control form-control-lg" placeholder="Type the password" />
                        </div>
                        <!--Checkbox and Forgot Password-->
                        <div class="d-flex justify-content-between align-items-center">
                            <!--checkbox-->
                            <div class="form-check mb-0">
                              <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                              <label class="form-check-label" for="form2Example3"> Remember me </label>
                            </div>
                            <!--link forgot password-->
                            <a class="text-body" style="cursor: pointer" @click="esqueciSenha">Forgot password?</a>
                        </div>
                   
                        <!--fim-->
                        <!--Button Login and Register-->
                        <div class="text-center text-lg-start mt-4 pt-2">
                            <!--button-->
                            <div class="d-grid gap-2">
                                <button class="btn btn-primary btn-primary shadow" type="submit">Sign in</button>
                                
                            </div>
                            <!--register-->
                            <p class="small fw-bold mt-2 pt-1 mb-0 text-center">Don't have an account? <span class="text-danger fw-bold">Register as:</span> </p>
                            <div class="d-grid gap-2">

                                <!-- Button trigger modal-->
                                <div class="text-center">
                                    <RegUsuario/>
                                    <RegFornecedor/>  
                                                              
                                </div>
                            </div>
                        </div>
                    </form>
                    <Teste :email="email" :password="senha"/>
                </div>
            </div>
        </div>
    </section>
    </body>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import RegUsuario from '../components/modal/RegistrarUsuarioModal.vue'
    import RegFornecedor from '../components/modal/RegistrarFornecedorModal.vue'
    import Teste from './Teste.vue'
    import api from '@/http/index'
    import router from '@/router'
    import Cookies from 'js-cookie';

    export default defineComponent({
        // eslint-disable-next-line vue/multi-word-component-names
        name: "Login",
        data(){
            return{
                email: '',
                senha: ''

            }
        },
        emits:['validaUsuarios'],
        components: {
            RegUsuario,
            RegFornecedor,
            Teste,
           
        },
        methods: {
            
            async validaUsuario(){
                await api.post('auth', {'email':this.email, 'senha':this.senha})
                    .then((response) => {
                        Cookies.set('token', response.data.token, {secure:true, httpOnly: false})
                        Cookies.set('email', this.email)
                        console.log(Cookies.get('token'))
                        //console.log(response.data),
                        router.push('/')
                    })
                    .catch((err) => console.log("Erro: "+ err))
                
            },
            esqueciSenha(){
                console.log("esqueci minha senha")
            }
        },
        
    })

</script>

<style>
    .divider:after,
    .divider:before {
    content: "";
    flex: 1;
    height: 1px;
    background: #eee;
    }
    .h-custom {
    height: calc(100% - 73px);
    }
    @media (max-width: 450px) {
    .h-custom {
    height: 100%;
    }
    }
    .background{
    background-color: #ffffff;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='0' x2='0' y1='1' y2='0' gradientTransform='rotate(60,0.5,0.5)'%3E%3Cstop offset='0' stop-color='%23FF0000'/%3E%3Cstop offset='1' stop-color='%23FFF10E'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' x1='0' x2='0' y1='0' y2='1' gradientTransform='rotate(151,0.5,0.5)'%3E%3Cstop offset='0' stop-color='%23F00'/%3E%3Cstop offset='1' stop-color='%23FC0'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='%23FFF' fill-opacity='0' stroke-miterlimit='10'%3E%3Cg stroke='url(%23a)' stroke-width='9.899999999999999'%3E%3Cpath transform='translate(-5.95 0.7999999999999999) rotate(0.35 1409 581) scale(0.9999909999999999)' d='M1409 581 1450.35 511 1490 581z'/%3E%3Ccircle stroke-width='3.3000000000000003' transform='translate(-5.5 4) rotate(0.7 800 450) scale(1.002)' cx='500' cy='100' r='40'/%3E%3Cpath transform='translate(2 -7.5) rotate(6.5 401 736) scale(1.002)' d='M400.86 735.5h-83.73c0-23.12 18.74-41.87 41.87-41.87S400.86 712.38 400.86 735.5z'/%3E%3C/g%3E%3Cg stroke='url(%23b)' stroke-width='3'%3E%3Cpath transform='translate(24 -0.6) rotate(0.15 150 345) scale(0.9979969999999999)' d='M149.8 345.2 118.4 389.8 149.8 434.4 181.2 389.8z'/%3E%3Crect stroke-width='6.6000000000000005' transform='translate(-10.5 -10.5) rotate(7.200000000000001 1089 759)' x='1039' y='709' width='100' height='100'/%3E%3Cpath transform='translate(-18.4 5.6) rotate(1.2000000000000002 1400 132) scale(0.995)' d='M1426.8 132.4 1405.7 168.8 1363.7 168.8 1342.7 132.4 1363.7 96 1405.7 96z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    background-attachment: fixed;
    background-size: cover;
    }
   
</style>