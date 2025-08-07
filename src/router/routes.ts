import { RouteItem } from './types'
import { authRoutes } from '@/modules/auth/routes'

// 合并所有需要主布局的路由
const layoutRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/modules/dashboard/views/Dashboard.vue'),
    meta: {
      title: '仪表板',
      requiresAuth: true
    }
  },
  {
    path: '/menu-management',
    name: 'MenuManagement',
    component: () => import('@/modules/dashboard/views/MenuManagement.vue'),
    meta: {
      title: '菜单管理',
      requiresAuth: true
    }
  },
  {
    path: '/employees',
    name: 'Employees',
    component: () => import('@/modules/employee/views/EmployeeList.vue'),
    meta: {
      title: '员工管理',
      requiresAuth: true
    }
  },
  {
    path: '/employees/create',
    name: 'CreateEmployee',
    component: () => import('@/modules/employee/views/CreateEmployee.vue'),
    meta: {
      title: '创建员工',
      requiresAuth: true
    }
  },
  {
    path: '/employees/edit/:id',
    name: 'EditEmployee',
    component: () => import('@/modules/employee/views/EditEmployee.vue'),
    meta: {
      title: '编辑员工',
      requiresAuth: true
    }
  }
]

// 路由配置
export const routes: RouteItem[] = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  ...authRoutes,
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    children: layoutRoutes
  }
]