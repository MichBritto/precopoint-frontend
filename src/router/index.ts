import { createRouter, createWebHistory, RouteRecordRaw, RouteLocationNormalized } from 'vue-router'
import Home from '../views/Home.vue'
import ListaUsuario from '../views/ListaUsuario.vue'
import Login from '../views/Login.vue'
import ListaProduto from '../views/ListaProduto.vue'
import ListaFornecedor from '../views/ListaFornecedor.vue'
import EditarConsumidor from '../views/EditarConsumidor.vue'
import EditarFornecedor from '../views/EditarFornecedor.vue'
import AdicionarProduto from '../views/AdicionarProduto.vue'
import Swal from 'sweetalert2'
import Cookies from 'js-cookie'
import ControleContas from '@/views/ControleContas.vue'
import jwt_decode from 'jwt-decode'

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
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: 'Login'
    }
  },
  {
    path: '/listas',
    name: 'ListaUsuario',
    component: ListaUsuario,
    meta: {
      title: 'Suas listas',
      auth: true,
      roles: ['ROLE_CONSUMIDOR']
    },
    
  },
  {
    path: '/lista-de-produtos',
    name: 'ListaProduto',
    component: ListaProduto,
    meta: {
      title: 'Sua lista',
      auth: true,
      roles: ['ROLE_CONSUMIDOR']
    },
    props: true
  },
  {
    path: '/produtos-fornecedor',
    name: 'ListaFornecedor',
    component: ListaFornecedor,
    meta: {
      title: 'Seus produtos',
      auth: true,
      roles: ['ROLE_FORNECEDOR']
    }
  },
  {
    path:'/editar-usuario',
    name:'EditarUsuario',
    component: EditarConsumidor,
    meta: {
      title: 'Editar Perfil',
      auth: true,
      roles: ['ROLE_CONSUMIDOR']
    } 
  },
  {
    path:'/editar-fornecedor',
    name:'EditarFornecedor',
    component: EditarFornecedor,
    meta: {
      title: 'Editar Perfil',
      auth: true,
      roles: ['ROLE_FORNECEDOR']
    } 
  },
  {
    path: '/adicionar-produto',
    name: 'AdicionarProduto',
    component: AdicionarProduto,
    meta: {
      title: 'Adicionar Produto',
      auth: true,
      roles: ['ROLE_FORNECEDOR']
    }
  },
  {
    path: '/gerenciar-contas',
    name: 'ControleContas',
    component: ControleContas,
    meta: {
      title: 'Gerenciar Contas',
      auth: true,
      roles: ['ROLE_ADMINISTRADOR']
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to) => {
  document.title = getTitle(to);
  if (to.meta?.auth){
    const token = Cookies.get('token');
    if (!token) {
      router.replace('/login')
      document.title = 'Login'
      Swal.fire({
          title: 'Psiuuu, espera aí...',
          text: 'Antes de prosseguir para a página você precisa fazer login!',
          icon: 'warning',
      })
    }
    else {
      const decodedToken = jwt_decode(token) as { roles: string[] };
      const userRoles = decodedToken.roles
      if(to.meta.roles && !hasRequiredRoles(userRoles, to.meta.roles as string[])) {
        router.push('/');
        Swal.fire({
          title: 'Psiuuu, espera aí...',
          text: 'Parece que você não tem permissão para acessar aquela página :(',
          icon: 'warning',
        })
      }
    }
  }
});

function hasRequiredRoles(userRoles: string[], requiredRoles: string[]) {
  return requiredRoles.every((role) => userRoles.includes(role) || userRoles.includes('ROLE_ADMINISTRADOR'))
}

function getTitle(route: RouteLocationNormalized){
  const title = route.meta.title as string;
  if (title) {
    return title;
  }
  return 'Page not found - PreçoPoint'; // Titulo padrão caso não haja uma definição específica
}

export default router
