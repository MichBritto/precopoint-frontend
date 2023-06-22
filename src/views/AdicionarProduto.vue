<template>
    <Navbar></Navbar>
    <!--Title-->
    <div class="row" >
        <div class="col">
            <div class="d-flex justify-content-between mt-4 mb-4" >
                <p></p>
                <div class="text-center mx-auto text-uppercase"> <span class="h1 text-warning fw-bold" >Cadastrar produtos</span></div>
            </div>
        </div>
    </div> 
    <hr>
    <!--Form-->
    <div class="row">
        <div class="col-lg-2"></div>
        <div class="col-lg-8">
            <div class="row">
                <div class="form-group row mt-2">
                    <label for="produto" class="col-sm-2 col-form-label"><i class="fa-brands fa-product-hunt fa-lg"></i> Nome</label>
                    <div class="col-sm-10">
                        <input v-model="v$.produto.$model" :class="{'is-invalid' : v$.produto.$errors.length}" type="text" class="form-control" id="produto" placeholder="Digite o nome do produto...(Ex: Bolacha, Pão, Laranja, Ovo)">
                        <div class="text-danger " v-for="error in v$.produto.$errors" :key="error.$uid">
                            <span> • {{ error.$message }}</span>
                        </div>
                    </div>
                </div>
                <div class="form-group row mt-2">
                    <label for="descricao" class="col-sm-2 col-form-label"><i class="fa-solid fa-clipboard-list fa-lg"></i> Descrição</label>
                    <div class="col-sm-10">
                        <input v-model="v$.descricao.$model" :class="{'is-invalid' : v$.descricao.$errors.length}" type="text" class="form-control" id="descricao" placeholder="Digite a descrição do prod...(Ex: 10kg, 1L, 1M, 269ml)">
                        <div class="text-danger " v-for="error in v$.descricao.$errors" :key="error.$uid">
                            <span> • {{ error.$message }}</span>
                        </div>
                    </div>
                </div>
                <div class="form-group row mt-2">
                    <label for="preco" class="col-sm-2 col-form-label"><i class="fa-sharp fa-solid fa-money-bill fa-lg"></i> Preço</label>    
                    <div class="col-sm-10">
                        <div class="input-group">
                            <span class="input-group-text">R$</span>
                            <input v-model="v$.preco.$model" :class="{'is-invalid' : v$.preco.$errors.length}" type="text"  class="form-control" id="preco" placeholder="Ex: 10, 5, 10.2, 7.2 etc...">
                        </div>  
                        <div class="text-danger " v-for="error in v$.preco.$errors" :key="error.$uid">
                            <span> • {{ error.$message }}</span>
                        </div>
                    </div> 
                </div>
                <div class="form-group row mt-2">
                    <label for="imagem" class="col-sm-2 col-form-label"><i class="fa-solid fa-image fa-lg"></i> Imagem (URL)</label>
                    <div class="col-sm-10">
                        <input v-model="v$.imagem.$model" :class="{'is-invalid' : v$.imagem.$errors.length}" type="text" class="form-control" id="imagem" placeholder="Insira a url da imagem do prod...(Ex: https://www.imagem.com/produto-imagem.jpg)">
                        <div class="text-danger " v-for="error in v$.imagem.$errors" :key="error.$uid">
                            <span> • {{ error.$message }}</span>
                        </div>
                    </div>
                </div>
                <div class="form-group row mt-2">
                    <label for="marcaProduto" class="col-sm-2 col-form-label"><i class="fa-sharp fa-solid fa-bookmark fa-lg"></i> Marca</label>
                    <div class="col-sm-10">
                        <input v-model="v$.marcaProduto.$model" :class="{'is-invalid' : v$.marcaProduto.$errors.length}" type="text" class="form-control" id="marcaProduto" placeholder="Digite a marca do produto...">
                        <div class="text-danger " v-for="error in v$.marcaProduto.$errors" :key="error.$uid">
                            <span> • {{ error.$message }}</span>
                        </div>
                    </div>
                </div>
                <div class="form-group row mt-2">
                    <label for="categoria" class="col-sm-2 col-form-label"><i class="fa-solid fa-tags fa-lg"></i> Categoria</label>
                    <div class="col-sm-10">
                        <div class="mb-3">
                            <select v-model="v$.categoria.$model" :class="{'is-invalid' : v$.categoria.$errors.length}" class="form-select" id="categoria">
                                <option value="" selected>Selecione uma categoria</option>
                                <option v-for="cat in listCategorias" :key="cat.id" :value="cat.categoria">{{ cat.categoria }}</option>
                            </select>
                            <div class="text-danger " v-for="error in v$.categoria.$errors" :key="error.$uid">
                                <span> • {{ error.$message }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>    
        </div>
        <div class="container text-center">
            <button type="button" class="btn btn-success me-2" @click="cadastrarProduto()"><i class="fa-solid fa-circle-plus"></i> Cadastrar</button>
            <button type="button" class="btn btn-primary" @click="limparCampos()"><i class="fa-sharp fa-solid fa-filter-circle-xmark"></i> Limpar campos</button>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from "vue"
    import Navbar from "../components/HeaderTemplate.vue"
    import api from "@/http"
    import ICategoria from "@/interfaces/ICategoria"
    import Swal from 'sweetalert2'
    import { useVuelidate } from '@vuelidate/core'
    import { required, helpers, numeric } from '@vuelidate/validators'
import Cookies from "js-cookie"

    export default defineComponent({
        // eslint-disable-next-line vue/no-parsing-error
        name:"AdicionarProduto",
        components:{
            Navbar
        },
        data() {
            return {
                produto:'',
                preco:'',
                imagem:'',
                descricao:'',
                marcaProduto:'',
                fornecedor:'',
                categoria:'',
                listCategorias: [] as ICategoria[],
            }
        },
        mounted() {
            this.fornecedor = Cookies.get('email') as string;
            this.getCategorias();
        },
        setup() {
            return { v$: useVuelidate() };
        },
        validations() {
            return {
                produto: {
                    required: helpers.withMessage('Campo obrigatório', required),
                },
                preco: {
                    required: helpers.withMessage('Campo obrigatório', required),
                    numeric: helpers.withMessage('Campo deve ser do tipo numérico', numeric)
                },
                imagem: {
                    required: helpers.withMessage("Campo obrigatório", required),
                },
                descricao: {
                    required: helpers.withMessage('Campo obrigatório', required),
                },
                marcaProduto: {
                    required: helpers.withMessage('Campo obrigatório', required),
                },  
                categoria: {
                    required: helpers.withMessage('Campo obrigatório', required),
                },  
            }
        },
        methods: {
            async getCategorias() {
                await api.get('filtro/get-categorias')
                    .then((response) => {
                        this.listCategorias = response.data;
                    })
            },
            async cadastrarProduto() {
                if(!this.validarCampos()){
                    Swal.fire({
                        title: 'Campos vazios!',
                        text:"Existem campos vazios que precisam ser preenchidos",
                        icon: 'warning',
                    })
                    return;
                }
                if(!this.validarPreco()){
                    Swal.fire({
                        title: 'Formato de preço inválido',
                        text:"Preço não pode contem letrars ou caracteres especiais, Ex de valor correto: 10, 10.5, 10.25 ...",
                        icon: 'warning',
                    })
                    return;
                }
                Swal.fire({
                        title: 'Aguarde!',
                        text:"Adicionando produto...",
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        didOpen: () => {
                            Swal.showLoading();
                            api.post('produto/add',
                            {
                                produto:this.produto,
                                preco:this.preco,
                                imagem:this.imagem,
                                descricao:this.descricao,
                                marcaProduto:this.marcaProduto,
                                fornecedor:this.fornecedor,
                                categoria:this.categoria
                            },
                            {
                                headers: {
                                    Authorization: 'Bearer '+ Cookies.get('token')
                                }
                            })
                            .then(()  =>{
                                setTimeout(() => {
                                    Swal.close();
                                }, 1000);
                                setTimeout(() => {
                                    Swal.fire({
                                        title: 'Produto cadastrado com sucesso!',
                                        text:"Produto: '"+ this.produto +"' foi adicionado aos seus produtos e já está visível para os consumidores!",
                                        icon: 'success',
                                    })
                                    this.limparCampos();
                                }, 2000)
                            })
                            .catch((error) => {
                                Swal.fire({
                                    title: 'Erro ao cadastrar produto!',
                                    text:"Produto não adicionado, revise os campos e tente novamente. Erro: '"+ error.response.data.errorMessage+"'",
                                    icon: 'error',
                                })
                            })
                        }
                    })
                
            },
            validarCampos(): boolean {
                if(this.produto.trim() === "" || this.descricao.trim() === "" || this.preco.trim() === '' || this.imagem.trim() === "" ||
                     this.marcaProduto.trim() === "" || this.categoria.trim() === ""){
                    return false;
                }
                else {
                    return true;
                }
            },
            validarPreco(): boolean {
                const precoAux = parseFloat(this.preco)
                if (!isNaN(precoAux)) {
                    // A conversão foi bem-sucedida e o valor é um número
                    // Faça algo aqui com o valorNumber, que é do tipo number
                    return true;
                } else {
                    // A conversão falhou, o valor não é um número válido
                    // Faça algo aqui para lidar com a validação falha
                    return false;
                }
            },
            limparCampos(){
                this.produto = '';
                this.descricao = '';
                this.preco = '';
                this.imagem = '';
                this.marcaProduto = '';
                this.categoria = '';
            }
            
        }
    })
</script>

<style scoped>
    label{
        font-weight:600;

    }
    .labelfile{
        font-weight:normal
    }
    .botao{
        padding-left:5rem;
        padding-right:5rem;
    }    
</style>
