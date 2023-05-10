<template>
    <div class="pagination">
      <ul>
        <li v-if="showPreviousButton"><a href="#" @click.prevent="previousPage">&laquo;</a></li>
        <li v-for="page in pages" :key="page" :class="{active: page === currentPage}">
          <a href="#" @click.prevent="changePage(page)">{{ page }}</a>
        </li>
        <li v-if="showNextButton"><a href="#" @click.prevent="nextPage">&raquo;</a></li>
      </ul>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Pagination',
    props: {
      currentPage: {
        type: Number,
        default: 1
      },
      totalItems: {
        type: Number,
        required: true
      },
      itemsPerPage: {
        type: Number,
        default: 3
      },
      maxVisibleButtons: {
        type: Number,
        default: 5
      }
    },
    computed: {
      totalPages() {
        return Math.ceil(this.totalItems / this.itemsPerPage);
      },
      pages() {
        const pages = [];
        const startPage = Math.max(1, this.currentPage - Math.floor(this.maxVisibleButtons / 2));
        const endPage = Math.min(this.totalPages, startPage + this.maxVisibleButtons - 1);
        
        for (let i = startPage; i <= endPage; i++) {
          pages.push(i);
        }
        
        return pages;
      },
      showPreviousButton() {
        return this.currentPage > 1;
      },
      showNextButton() {
        return this.currentPage < this.totalPages;
      }
    },
    methods: {
      previousPage() {
        if (this.currentPage > 1) {
          this.changePage(this.currentPage - 1);
        }
      },
      nextPage() {
        if (this.currentPage < this.totalPages) {
          this.changePage(this.currentPage + 1);
        }
      },
      changePage(page : number) {
        this.$emit('page-changed', page);
      }
    }
  })
  </script>
  
  <style>
.pagination {
  margin: 20px 0;
}

.pagination ul {
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
}

.pagination li {
  margin: 0;
  padding: 0;
}

.pagination a {
  display: inline-block;
  padding: 8px 16px;
  color: #ffc107;
  text-decoration: none;
  border: 1px solid #ffc107;
  border-radius: 4px;
}

.pagination a:hover {
  background-color: #ffc107;
  color: #fff;
}

.pagination .active a {
  background-color: #ffc107;
  color: #fff;
}
</style>