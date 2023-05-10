<template> 
    <tr class="table-light table-hover text-center">
        <th scope="row">{{ 1 }}</th>
        <td ><img  v-bind:src="produto.imagem" width="30" height="30" ></td>
        <td style="align-items: left"  >{{ produto.produto }}</td>
        <td style="align-items: left">{{ produto.descricao }}</td>
        <td>R$ {{ produto.preco }}</td>
        <td>{{ produto.quantidade }}</td>
        <td><button @click="editarProduto(produto)"><img src="../assets/edit.jpg" width="40" height="40" ></button></td>   
    </tr>  
</template>
<script lang="ts">
    import { PropType } from 'vue';
    import IProduto from '../interfaces/IProduto'
    export default ({
        name: "produtoLista",
        props: {
            produto: {
                type: Object as PropType<IProduto>,
                required: true
            }
                
        },
        methods: {
            editarProduto(produto: IProduto){
                    produto.quantidade -= 1
                    
            },
        }
    })
</script>