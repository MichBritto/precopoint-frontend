<template>
    <Navbar></Navbar>
    <div class="row" >
                <div class="col">
                    <div class="d-flex justify-content-between mt-4 mb-4" >
                        <p></p>
                        <div class="text-center mx-auto text-uppercase"> <span class="h1 text-warning fw-bold" >Editar Perfil</span></div>
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
                        <label for="inputName" class="col-sm-2 col-form-label" >Your Company Name</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="inputName" placeholder="Your Company Name">
                        </div>
                    </div>
                    <div class="form-group row mt-2">
                        <label for="inputEndereco" class="col-sm-2 col-form-label">Address</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="inputEndereco" placeholder="Address">
                        </div>
                    </div>
                    <div class="form-group row mt-2">
                        <label for="inputCNPJ" class="col-sm-2 col-form-label">CNPJ</label>
                        <div class="col-sm-10">
                        <input type="text" class="form-control" id="inputCNPJ" placeholder="CNPJ">
                        </div>
                    </div>
                    <div class="form-group row mt-2">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
                        <div class="col-sm-10">
                        <input type="text" readonly class="form-control" id="staticEmail" value="email@example.com">
                        </div>
                    </div>
                    <div class="form-group row mt-2">
                        <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
                        <div class="col-sm-10">
                        <input type="password" class="form-control" id="inputPassword" placeholder="Password">
                        </div>
                    </div>
                    <div class="form-group row mt-2">
                        <label for="inputRPassword" class="col-sm-2 col-form-label">Repeat Your Password</label>
                        <div class="col-sm-10">
                        <input type="password" class="form-control" id="inputRPassword" placeholder="Repeat Your Password">
                        </div>
                    </div>
                    <div class="row mt-2">
                        <div class="col-2 ">
                            <div class="input-group-prepend" >
                                <label>Logo da Empresa</label>
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
                        <button type="button" class="btn btn-outline-success btn-block mb-2 mt-4 justify-content-sm-between botao">Salvar</button>
                        <button type="button" class="btn btn-outline-danger btn-block mb-2 mt-4 justify-content-sm-between botao" style="margin-left:4px;">Excluir</button>
                    </div>
                </div>
            </div>
        </div>
</template>

<script lang="ts">
    import Navbar from "../components/HeaderTemplate.vue"
    export default({
        // eslint-disable-next-line vue/no-parsing-error
        name:"EditarFornecedor",
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
