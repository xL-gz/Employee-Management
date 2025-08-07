<template>
  <el-container class="layout-container">
    <!-- 侧边栏 -->
    <el-aside width="200px" class="sidebar">
      <div class="logo">
        <h2>员工管理系统</h2>
      </div>
      <el-menu
        :default-active="activeMenu"
        class="sidebar-menu"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
        :unique-opened="true"
      >
        <el-menu-item 
          v-for="menu in menuStore.enabledMenus" 
          :key="menu.id"
          :index="menu.path"
        >
          <el-icon v-if="menu.icon">
            <component :is="menu.icon" />
          </el-icon>
          <span>{{ menu.title }}</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <!-- 主体区域 -->
    <el-container>
      <!-- 头部 -->
      <el-header class="header">
        <div class="header-left">
          <h3>{{ currentPageTitle }}</h3>
        </div>
        <div class="header-right">
          <el-dropdown @command="handleUserCommand">
            <span class="user-info">
              <el-avatar :size="30" icon="UserFilled" />
              <span class="username">管理员</span>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="menu-management">菜单管理</el-dropdown-item>
                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>

      <!-- 主要内容 -->
      <el-main class="main-content">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMenuStore } from '@/store/modules/menu'
import { 
  House, 
  User, 
  Setting, 
  Document, 
  DataLine 
} from '@element-plus/icons-vue'

// 注册图标组件
const icons = {
  House,
  User,
  Setting,
  Document,
  DataLine
}

const route = useRoute()
const router = useRouter()
const menuStore = useMenuStore()

// 当前激活的菜单项
const activeMenu = computed(() => {
  const { path } = route
  return path
})

// 当前页面标题
const currentPageTitle = computed(() => {
  // 优先从菜单中获取标题
  const menuTitle = menuStore.getMenuTitleByPath(route.path)
  if (menuTitle) {
    return menuTitle
  }
  
  // 默认标题映射
  const titles: Record<string, string> = {
    '/dashboard': '仪表板',
    '/employees': '员工管理',
    '/employees/create': '创建员工',
    '/employees/edit/:id': '编辑员工',
    '/menu-management': '菜单管理'
  }
  
  // 简单匹配规则
  for (const [key, value] of Object.entries(titles)) {
    const regex = new RegExp('^' + key.replace(/:[^/]+/g, '[^/]+') + '$')
    if (regex.test(route.path)) {
      return value
    }
  }
  
  return '仪表板'
})

// 处理用户操作
const handleUserCommand = (command: string) => {
  if (command === 'menu-management') {
    router.push('/menu-management')
  } else if (command === 'logout') {
    // 清除认证信息
    localStorage.removeItem('token')
    // 跳转到登录页
    router.push('/login')
  }
}
</script>

<style scoped>
.layout-container {
  min-height: 100vh;
}

.sidebar {
  background-color: #545c64;
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
  overflow: hidden;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
}

.logo {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #545c64;
  color: white;
  border-bottom: 1px solid #6b7680;
}

.sidebar-menu {
  border: none;
  height: calc(100% - 60px);
}

.sidebar-menu:not(.el-menu--collapse) {
  width: 200px;
}

.header {
  background-color: #ffffff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.12);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 60px;
  line-height: 60px;
}

.header-left h3 {
  margin: 0;
  font-weight: 600;
  color: #303133;
}

.user-info {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.username {
  margin-left: 10px;
  font-size: 14px;
  color: #606266;
}

.main-content {
  margin-top: 60px;
  margin-left: 200px;
  padding: 20px;
  background-color: #f5f7fa;
  min-height: calc(100vh - 60px);
}
</style>