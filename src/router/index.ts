import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes
})

// 添加路由守卫
router.beforeEach((to, from, next) => {
  // 检查是否有token（模拟认证）
  const token = localStorage.getItem('token')
  
  // 如果访问的页面需要认证但没有token，则重定向到登录页
  if (to.meta.requiresAuth !== false && !token) {
    if (to.path !== '/login') {
      next({
        path: '/login',
        query: { redirect: to.fullPath } // 保存来源页面
      })
    } else {
      next()
    }
  } else {
    // 如果已经登录了还要访问登录页，则重定向到仪表板
    if (to.path === '/login' && token) {
      next({ path: '/dashboard' })
    } else {
      next()
    }
  }
})

export default router