import { RouteItem } from './types'

// 路由配置
export const routes: RouteItem[] = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/Dashboard.vue'),
    meta: {
      title: '仪表板'
    }
  },
  {
    path: '/employees',
    name: 'Employees',
    component: () => import('@/views/EmployeeList.vue'),
    meta: {
      title: '员工管理'
    }
  },
  {
    path: '/employees/create',
    name: 'CreateEmployee',
    component: () => import('@/views/CreateEmployee.vue'),
    meta: {
      title: '创建员工'
    }
  },
  {
    path: '/employees/edit/:id',
    name: 'EditEmployee',
    component: () => import('@/views/EditEmployee.vue'),
    meta: {
      title: '编辑员工'
    }
  }
]