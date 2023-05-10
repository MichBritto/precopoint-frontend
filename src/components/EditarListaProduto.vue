<template >
    <!--Button Supplier-->
    <button type="button"  class="btn" data-bs-toggle="modal" :data-bs-target="'#btnEditarProduto' + produto?.id"><img src="../assets/edit.jpg" width="40" height="40" ></button>
    <!-- Modal - Fornecedor-->
    <div class="modal fade" :id="'btnEditarProduto' + produto?.id" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog modal-xl modal-dialog-centered ">
                    <div class="modal-content">
                        <div class="modal-header border-0">
                            <!--Button Close-->
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body align-center">
                            
                            <table class="table table-bordered">
                            
                                <thead class="table-dark text-center">
                                    <tr>
                                        <th scope="col">Imagem</th>
                                        <th scope="col">Produto</th>
                                        <th scope="col">Detalhe</th>
                                        <th scope="col">Valor</th>
                                        <th scope="col">Valor total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="table-light table-hover text-center">
                                        <td ><img  v-bind:src="produto?.imagem" width="30" height="30" ></td>
                                        <td style="align-items: left">{{ produto?.produto }}</td>
                                        <td style="align-items: left">{{ produto?.descricao }}</td>
                                        <td>R$ {{ (Number(produto?.preco)).toLocaleString('pt-BR', {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                            useGrouping: true
                                            }) }}</td>
                                        <td>R$ {{ valorTotal }}</td>
                                    </tr>  
                                </tbody>
                            </table>
                            <button type="button" class="btn" @click="removeProduto()">-</button>
                            <input type="number"  class="text-center input-quantidade" v-model="quantidade"/>
                            <button type="button" class="btn" @click="addProduto()">+</button>
                            <button type="button" class="update-button" @click="emitirQuantidade"  data-bs-dismiss="modal" aria-label="Close">Atualizar</button>

                        </div>
                        
                    </div>
                </div> 
    </div>
</template>



<script lang="ts">
import IProduto from '@/interfaces/IProduto';
import { defineComponent ,PropType } from 'vue';

    
    export default defineComponent({
        name: "EditarListaProduto",
        emits:["editar-quantidade"],
        props:{
            produto: Object as PropType<IProduto>
            
        },
        data(){
          return {
            quantidade: 0 as number
          }
        },
        mounted(){
            this.quantidade = Number(this.produto?.quantidade);
        },
        computed:{
            valorTotal(){
                return (Number(this.quantidade) * Number(this.produto?.preco)).toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
                useGrouping: true
                });
            }
        },
        methods: {
            addProduto(){
                this.quantidade += 1
            },
            removeProduto(){
                this.quantidade -= 1
            },
            emitirQuantidade() {
                this.$emit('editar-quantidade', Math.round(this.quantidade))
            }
            
        },
        
    })
</script>

<style scoped>
    .update-button {
    float: right;
    background-color: #FFC107;
    color: black;
    border-radius: 5px;
    padding: 10px 20px;
    border: none;
    font-size: 16px;
    cursor: pointer;
    }


    input[type=number]::-webkit-inner-spin-button, 
    input[type=number]::-webkit-outer-spin-button { 
        -webkit-appearance: none; 
        margin: 0; 
    }
</style>