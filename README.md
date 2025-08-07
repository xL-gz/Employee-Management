# Employee-Management
员工后台管理系统

## 技术栈

- Vue 3.x
- TypeScript
- Vite
- Element Plus
- Pinia (状态管理)
- Vue Router

## 项目结构

```
src/
├── api/                  # API接口定义
├── assets/               # 静态资源文件
├── components/           # 全局组件
│   └── index.ts          # 组件注册入口
├── layouts/              # 布局组件
├── router/               # 路由配置
│   ├── index.ts          # 路由初始化
│   ├── routes.ts         # 路由定义
│   └── types.ts          # 路由类型定义
├── store/                # 状态管理(Pinia)
│   ├── modules/          # 状态管理模块
│   └── index.ts          # 状态管理初始化
├── types/                # 全局类型定义
├── utils/                # 工具函数
├── views/                # 页面视图
├── App.vue               # 根组件
├── main.ts               # 入口文件
├── shims-vue.d.ts        # Vue类型声明
└── vite-env.d.ts         # Vite环境类型声明
```

## 开发环境

### 必需工具

- Node.js (推荐 LTS 版本)
- pnpm

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

### 构建生产版本

```bash
pnpm build
```

### 预览生产构建

```bash
pnpm preview
```

## 项目规范

### 代码规范

- 使用 TypeScript 进行开发，确保类型安全
- 遵循 ESLint 和 Prettier 的代码风格规范
- 组件命名采用 PascalCase 格式
- CSS 类名使用 kebab-case 格式

### Git 提交规范

- 使用 conventional commits 规范提交信息
- 提交前确保通过所有测试和代码检查

### 组件开发规范

- 单文件组件 (.vue) 按照 `<template>`, `<script>`, `<style>` 的顺序组织
- 组件应具有清晰的职责划分，保持单一职责原则
- 可复用组件应放置在 `components/` 目录下

### 路由规范

- 路由配置统一在 `router/routes.ts` 中管理
- 路由命名采用 kebab-case 格式
- 异步路由组件使用动态导入

### 状态管理规范

- 使用 Pinia 进行状态管理
- 每个业务模块对应一个 store 模块
- store 模块文件放置在 `store/modules/` 目录下
- 状态变更只能通过定义的 actions 进行

## 目录详细说明

### API 层
所有与后端的交互都应通过 `api/` 目录中的文件进行，统一管理项目中的网络请求。

### Components 组件
全局公共组件存放目录，通过 `components/index.ts` 统一注册，方便在项目中使用。

### Layouts 布局
页面的整体布局组件，如主布局、登录布局等。

### Router 路由
使用 Vue Router 进行路由管理，所有路由配置在 `routes.ts` 中定义。

### Store 状态管理
使用 Pinia 进行状态管理，按功能模块划分为不同的 store 模块。

### Types 类型定义
项目中使用的 TypeScript 类型定义，包括接口、枚举等。

### Utils 工具函数
项目中通用的工具函数，如日期处理、字符串处理等。

## 开发流程

1. 从主分支创建功能分支
2. 在功能分支上进行开发
3. 提交代码前运行代码检查
4. 提交 Pull Request 进行代码审查
5. 审查通过后合并到主分支

## 部署说明

项目使用 Vite 构建，构建后的文件可部署到任何静态文件服务器上。