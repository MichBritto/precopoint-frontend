<template>

    <div class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <p>Modal body text goes here.</p>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-primary">Save changes</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
        </div>
    </div>
    </div>  
</template>

<script lang="ts">

import { PropType } from 'vue';
    import IProduto from '../interfaces/IProduto'
    export default ({
        name: "EditarProduto",
        props: {
            produtos: {
                type: Array as PropType<IProduto[]>,
                required: true
            }
                
        },
        data(){
            return{
                produto: String,
                preco: String,
                quantidade: Number,
                descricao: String
            }
        },
        computed: {

        }     
        ,
        methods: {
            comparaLista(produtos : IProduto){
                console.log(produtos)
            }
        }
    })
</script>