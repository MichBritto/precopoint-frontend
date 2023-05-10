<template>
    <Navbar/>
    

    <div class="container">

            <div class="row  ">
                <div class="col">
                    <div class="d-flex justify-content-between mt-4 mb-4" >
                        <p></p>
                        <div class="text-center mx-auto text-uppercase"> <span class="h1 text-warning fw-bold" >produtos</span></div>
                        <button type="button" class="btn btn-dark hover">Adicionar Novo Produto</button>
                        
                    </div>
                </div>
            </div> 
            <hr>   
            <div class="row">
                
                <div class="tabela col-8">                
                <table class="table table-bordered">
                
                    <thead class="table-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Imagem</th>
                            <th scope="col">Produto</th>
                            <th scope="col">Detalhe</th>
                            <th scope="col">Valor</th>
                            <th scope="col">Quantidade</th>
                            <th scope="col">Alterar</th>
                            <th scope="col">Remover</th>
                        </tr>
                    </thead>
                    <tbody >
                        <tr class="table-light table-hover">
                            <th scope="row">1</th>
                            <td ><img src="31R9MUUFL7L._AC_SL1000_.jpg" alt="carregando" width="20" height="20" ></td>
                            <td>Roteador</td>
                            <td>Redmi</td>
                            <td>R$ 10,00</td>
                            <td>5.00</td>
                            <td><a href="#"><img src="../assets/edit.jpg" alt="editar" width="40" height="40"></a></td>   
                            <td><a href="#"><img src="../assets/remove.png" alt="remover" width="30" height="30"></a></td>
                        </tr>   
                    </tbody> 
                    </table>
              
                </div>
            <!--End of Row-->
            </div>

    </div>
</template>

<script lang="ts">
    import Navbar from '../components/HeaderTemplate.vue'
    export default ({
        name: "ListaFornecedor",
        components: {
            Navbar
        }

    })
</script>
