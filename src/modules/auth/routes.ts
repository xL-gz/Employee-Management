import { RouteItem } from '@/router/types'

export const authRoutes: RouteItem[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('./views/Login.vue'),
    meta: {
      title: '登录',
      requiresAuth: false // 登录页面不需要认证
    }
  }
]