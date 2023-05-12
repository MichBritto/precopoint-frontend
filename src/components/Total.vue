<template>
    <table class="table table-bordered">
        <thead class="table-dark text-center">
            <tr>
                <th scope="col">Total de Itens</th>
                <th scope="col">Valor total</th>
            
            </tr>
        </thead>
        <tbody class="table-light table-hover text-center">
            <tr>
                <td>{{ quantidadeProdutos }}</td>
                <td>R$ {{ total.toLocaleString('pt-BR', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                        useGrouping: true
                        }) }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
    import IProduto from '@/interfaces/IProduto';
    import { defineComponent, PropType } from 'vue';

    export default defineComponent({
        // eslint-disable-next-line vue/multi-word-component-names
        name: "Total",
        props: {
            produtos: {
                type: Array as PropType<IProduto[]>,
                required: true
            }
        },
        computed: {
            total() {
                return this.produtos.reduce((total, produto) => {
                    return total + Number(produto.preco) * produto.qtde;
                }, 0);
            },
            quantidadeProdutos() : number{
                return this.produtos.reduce((acumulado,produto) =>{
                    return acumulado + produto.qtde;
                }, 0);
            }
        },
        methods: {

        }
    });

</script>
