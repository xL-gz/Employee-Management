import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// 定义菜单项类型
export interface MenuItem {
  id: string
  title: string
  path: string
  icon?: string
  parentId?: string | null
  order?: number
  enabled: boolean
}

// 初始菜单数据
const initialMenus: MenuItem[] = [
  {
    id: '1',
    title: '仪表板',
    path: '/dashboard',
    icon: 'House',
    parentId: null,
    order: 1,
    enabled: true
  },
  {
    id: '2',
    title: '员工管理',
    path: '/employees',
    icon: 'User',
    parentId: null,
    order: 2,
    enabled: true
  }
]

export const useMenuStore = defineStore('menu', () => {
  // 菜单列表
  const menus = ref<MenuItem[]>(initialMenus)

  // 获取启用的菜单
  const enabledMenus = computed(() => {
    return menus.value
      .filter(menu => menu.enabled)
      .sort((a, b) => (a.order || 0) - (b.order || 0))
  })

  // 添加菜单项
  const addMenu = (menu: Omit<MenuItem, 'id'>) => {
    const newMenu: MenuItem = {
      ...menu,
      id: Date.now().toString() // 简单生成ID
    }
    menus.value.push(newMenu)
    return newMenu
  }

  // 更新菜单项
  const updateMenu = (id: string, updatedMenu: Partial<MenuItem>) => {
    const index = menus.value.findIndex(menu => menu.id === id)
    if (index !== -1) {
      menus.value[index] = { ...menus.value[index], ...updatedMenu }
    }
  }

  // 删除菜单项
  const removeMenu = (id: string) => {
    menus.value = menus.value.filter(menu => menu.id !== id)
  }

  // 根据路径获取菜单项标题
  const getMenuTitleByPath = (path: string) => {
    const menu = menus.value.find(m => m.path === path)
    return menu ? menu.title : ''
  }

  return {
    menus,
    enabledMenus,
    addMenu,
    updateMenu,
    removeMenu,
    getMenuTitleByPath
  }
})