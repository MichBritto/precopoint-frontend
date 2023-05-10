<template>
    <Navbar></Navbar>
    <div class="row" >
                <div class="col">
                    <div class="d-flex justify-content-between mt-4 mb-4" >
                        <p></p>
                        <div class="text-center mx-auto text-uppercase"> <span class="h1 text-warning fw-bold" >Adicionar um produto</span></div>
                    </div>
                </div>
    </div> 
    <hr>
    <div class="row">
        <div class="col-lg-2 "></div>
        <div class="col-lg-8 ">
            <div class="row">
            <form>

                <div class="form-group row mt-2">
                    <label for="inputName" class="col-sm-2 col-form-label" >Produto</label>
                    <div class="col-sm-10 ">
                        <input type="text" class="form-control" id="inputName" placeholder="Nome do Produto">
                    </div>
                </div>
                <div class="form-group row mt-2">
                    <label for="inputEndereco" class="col-sm-2 col-form-label">Descrição</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="inputEndereco" placeholder="Sabor/Peso/Tipo">
                    </div>
                </div>
                <div class="form-group row mt-2">
                    <label for="inputCNPJ" class="col-sm-2 col-form-label">Valor</label>
                    <div class="col-sm-10">
                    <input type="text" class="form-control" id="inputCNPJ" placeholder="Valor do produto">
                    </div>
                </div>
                <div class="form-group row mt-2">
                    <label for="Categoria" class="col-sm-2 col-form-label">Categoria</label>
                    <!--                                                     Teste Categoria Dropdown                                                 -->
                    <div class="col-sm-10">
                        <div class="dropdown" >
                            <a class="btn btn-warning dropdown-toggle hover text-white fw-bold" style="width:100%" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Categorias
                            </a>
                            <div class="dropdown-menu" style="width:100%" aria-labelledby="dropDownCategoria">
                                <button class="dropdown-item" href="#">Action</button>
                                <button class="dropdown-item" href="#">Another action</button>
                                <button class="dropdown-item" href="#">Something else here</button>
                            </div>
                        </div>
                    </div>   
                    <!--                                                     Teste Categoria Dropdown                                                 -->
                    
                </div>
                <div class="row mt-2">
                    <div class="col-2 ">
                        <div class="input-group-prepend" >
                            <label>Imagem do Produto</label>
                        </div>
                    </div>
                    <div class="col-10 text-center">
                        <div class="custom-file ml-3">
                            <input type="file" class="custom-file-input ml-2" id="inputGroupFile03">
                            <label class="custom-file-label" for="inputGroupFile03"></label>
                        </div>
                    </div>
                </div>
                

                </form>
            </div>
            <div class="row">
                <div class="col-lg text-center">
                    <button type="button" class="btn btn-outline-success btn-block mb-2 mt-4 justify-content-sm-between botao">Adicionar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Navbar from "../components/HeaderTemplate.vue"
    export default({
        // eslint-disable-next-line vue/no-parsing-error
        name:"AdicionarProduto",
        components:{
            Navbar
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
