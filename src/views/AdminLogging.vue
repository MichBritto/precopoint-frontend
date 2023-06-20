<template>
    <Navbar/>
    <div class="row">
    <div class="col">
        <div class="d-flex justify-content-between mt-4 mb-4">
            <p></p>
            <div class="text-center mx-auto text-uppercase">
            <span class="h1 text-warning fw-bold">Logs do sistema</span>
            </div>
        </div>
        </div>
    </div>
    <hr>
    <div class="container">
        <!--Pagination-->
        <nav aria-label="Page navigation center">
            <ul class="pagination justify-content-center">
                <li class="page-item" :class="{ disabled: currentPage === 0 }">
                    <a class="page-link" href="#" aria-label="Previous" @click.prevent="firstPage()">
                        <span aria-hidden="true">&laquo;&laquo;</span>
                    </a>
                    <a class="page-link" href="#" aria-label="Previous" @click.prevent="previousPage()">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                <li class="page-item" v-for="page in  filteredPages" :key="page" :class="{ active: currentPage === page }" >
                <a class="page-link" href="#" @click.prevent="goToPage(page)">{{ page + 1 }}</a>
                </li>
                <li class="page-item" :class="{ disabled: currentPage === totalPages - 1 }">
                    <a class="page-link" href="#" aria-label="Next" @click.prevent="nextPage()">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                    <a class="page-link" href="#" aria-label="Next" @click.prevent="lastPage()">
                        <span aria-hidden="true">&raquo;&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
        <!--Table -->
        <table class="container table-light table-hover table-bordered ">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">User</th>
                    <th scope="col">Date</th>
                    <th scope="col">Level</th>
                    <th scope="col">Logger</th>
                    <th scope="col">Message</th>
                    <th scope="col"> Throwable</th>                   
                </tr>
            </thead>
            <tbody>
                <tr v-for="log in logList" :key="log.eventId">
                    <th scope="row">{{ log.eventId }}</th>
                    <td>{{ log.user }}</td>
                    <td>{{ log.eventDate }}</td>
                    <td>{{ log.level }}</td>
                    <td class="p-1">{{ log.logger }}</td>
                    <td class="scrollable-cell">{{ log.msg }}</td>
                    <td class="scrollable-cell">{{ log.throwable }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Navbar from '../components/HeaderTemplate.vue'
import api from '@/http'
import Cookies from 'js-cookie'
import ILogging from '@/interfaces/ILogging'

export default defineComponent({
    name: 'AdminLogging',
    components: {
        Navbar,
    },
    data() {
        return {
            currentPage: 0,
            paginatedData: [],
            totalPages:0,
            logList: [] as ILogging[],
            visiblePagesStart: 0,
            visiblePagesEnd: 14,
        }
    },
    computed: {
        filteredPages() {
        const totalPagesToShow = 14; // Defina o número de páginas visíveis desejado
        const halfTotalPagesToShow = Math.floor(totalPagesToShow / 2);
        let startPage = Math.max(0, this.currentPage - halfTotalPagesToShow);
        const endPage = Math.min(this.totalPages, startPage + totalPagesToShow);
        if (endPage - startPage < totalPagesToShow) {
            startPage = Math.max(0, endPage - totalPagesToShow);
        }
        return Array.from({ length: endPage - startPage }, (_, index) => startPage + index);
        },
    },
    created() {
        this.getData();
    },  
    methods: {
        async getData() {
            await api.get('admin/logs?page='+this.currentPage,
            {
                headers: {
                    Authorization: 'Bearer '+ Cookies.get('token')
                }
            })
            .then((response) => {
                this.logList = response.data.content;
                this.totalPages = response.data.totalPages ;
            })
        },
        previousPage() {
            this.currentPage--;
            this.getData();
        },
        nextPage() {
            this.currentPage++;
            this.getData();
        },
        goToPage(page:number) {
            this.currentPage = page;
            this.getData();
        },
        firstPage() {
            this.currentPage = 0;
            this.getData();
        },
        lastPage() {
            this.currentPage = this.totalPages - 1;
            this.getData();
        }
    }

})
</script>


<style scoped>
.scrollable-cell {
    max-width: 300px; /* Largura máxima da célula */
    overflow-x: auto; /* Desabilita a rolagem horizontal */
}

</style>