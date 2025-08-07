import type { RouteRecordRaw } from 'vue-router'

// 路由类型定义
export interface RouteMeta {
  title?: string
  icon?: string
  hidden?: boolean
  roles?: string[]
}

export type RouteItem = RouteRecordRaw & {
  meta?: RouteMeta
  children?: RouteItem[]
}