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
        data() {
            return {
                quantidadeProdutos: 0,
                totalProdutos: 0
            };
        },
        created() {
            this.produtos.forEach(element => {
                this.quantidadeProdutos += element.quantidade;
                this.totalProdutos += element.quantidade * Number(element.preco);
            });
        },
        computed: {
        total() {
            return this.produtos.reduce((total, produto) => {
                return total + Number(produto.preco) * produto.quantidade;
            }, 0);
        }
        },
        methods: {

        }
    });

</script>
