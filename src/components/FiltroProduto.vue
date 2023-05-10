<template>
<!--FILTRO--> 
<div class="container ">
    <span class="fw-bold me-3">Filtrar por:</span>
    <!--button FILTO-->
    <a class="border rounded shadow p-1" href="" data-bs-toggle="modal" data-bs-target="#filtro">
        <img class="img-filtro" src="@/assets/filter.png" alt="">
    </a> 
    <!--Modal-->
    <FiltroModal></FiltroModal>
</div> 
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import FiltroModal from '@/components/modal/FiltroModal.vue'
export default defineComponent({
    name: 'FiltroProduto',
    components: {
        FiltroModal,
    }

})
</script>

<style scoped>
    .img-filtro{
        height: 20px;
        width: 20px;
    }
</style>