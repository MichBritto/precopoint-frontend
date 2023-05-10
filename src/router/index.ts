
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import ListaUsuario from '../views/ListaUsuario.vue'
import Login from '../views/Login.vue'
import ListaProduto from '../views/ListaProduto.vue'
import ListaFornecedor from '../views/ListaFornecedor.vue'
import EditarUsuario from '../views/EditarUsuario.vue'
import EditarFornecedor from '../views/EditarFornecedor.vue'
import AdicionarProduto from '../views/AdicionarProduto.vue'
import Pagination  from '../components/Pagination.vue'
import { RouteMeta } from '@/interfaces/RouteMeta'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Página inicial'
    } 
  },
  {
    path: '/listas',
    name: 'ListaUsuario',
    component: ListaUsuario,
    meta: {
      title: 'Suas listas'
    },
    
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: 'Login'
    }
  },
  {
    path: '/lista-de-produtos',
    name: 'ListaProduto',
    component: ListaProduto,
    meta: {
      title: 'Sua lista'
    },
    props: true
  },
  {
    path: '/produtos-fornecedor',
    name: 'ListaFornecedor',
    component: ListaFornecedor,
    meta: {
      title: 'Seus produtos'
    }
  },
  {
    path:'/editar-usuario',
    name:'EditarUsuario',
    component: EditarUsuario,
    meta: {
      title: 'Editar Perfil'
    } 
  },
  {
    path:'/editar-fornecedor',
    name:'EditarFornecedor',
    component: EditarFornecedor,
    meta: {
      title: 'Editar Perfil'
    } 
  },
  {
    path: '/adicionar-produto',
    name: 'AdicionarProduto',
    component: AdicionarProduto,
    meta: {
      title: 'Adicionar Produto'
    }
  },
  {
    path: '/teste',
    name: 'Pagination',
    component: Pagination,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const meta = to.meta as unknown as RouteMeta
  document.title = meta.title
  next()
})

export default router
