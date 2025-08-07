<template>
  <div class="menu-management">
    <el-card class="menu-card">
      <template #header>
        <div class="card-header">
          <span>菜单管理</span>
          <el-button type="primary" @click="openAddMenuDialog">添加菜单</el-button>
        </div>
      </template>

      <el-table :data="menuStore.menus" style="width: 100%" row-key="id">
        <el-table-column prop="title" label="菜单名称" />
        <el-table-column prop="path" label="路径" />
        <el-table-column prop="icon" label="图标" />
        <el-table-column prop="order" label="排序" />
        <el-table-column label="状态">
          <template #default="scope">
            <el-tag :type="scope.row.enabled ? 'success' : 'danger'">
              {{ scope.row.enabled ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button size="small" @click="openEditMenuDialog(scope.row)">编辑</el-button>
            <el-button 
              size="small" 
              type="danger" 
              @click="handleDeleteMenu(scope.row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加/编辑菜单对话框 -->
    <el-dialog 
      :title="dialogTitle" 
      v-model="dialogVisible" 
      width="500px"
      @close="handleDialogClose"
    >
      <el-form 
        :model="menuForm" 
        :rules="menuFormRules" 
        ref="menuFormRef" 
        label-width="80px"
      >
        <el-form-item label="菜单名称" prop="title">
          <el-input v-model="menuForm.title" />
        </el-form-item>
        <el-form-item label="路径" prop="path">
          <el-input v-model="menuForm.path" />
        </el-form-item>
        <el-form-item label="图标" prop="icon">
          <el-select v-model="menuForm.icon" placeholder="请选择图标" clearable>
            <el-option label="仪表板" value="House" />
            <el-option label="用户" value="User" />
            <el-option label="设置" value="Setting" />
            <el-option label="文档" value="Document" />
            <el-option label="数据" value="DataLine" />
          </el-select>
        </el-form-item>
        <el-form-item label="排序" prop="order">
          <el-input-number v-model="menuForm.order" :min="0" />
        </el-form-item>
        <el-form-item label="状态" prop="enabled">
          <el-switch v-model="menuForm.enabled" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSaveMenu">保存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useMenuStore, type MenuItem } from '@/store/modules/menu'
import type { FormInstance, FormRules } from 'element-plus'

const menuStore = useMenuStore()

// 对话框相关
const dialogVisible = ref(false)
const dialogTitle = ref('')
const isEditMode = ref(false)
const currentEditId = ref('')

// 表单引用
const menuFormRef = ref<FormInstance>()

// 菜单表单数据
const menuForm = reactive({
  title: '',
  path: '',
  icon: '',
  order: 0,
  enabled: true
})

// 表单验证规则
const menuFormRules = reactive<FormRules>({
  title: [
    { required: true, message: '请输入菜单名称', trigger: 'blur' }
  ],
  path: [
    { required: true, message: '请输入路径', trigger: 'blur' }
  ]
})

// 打开添加菜单对话框
const openAddMenuDialog = () => {
  dialogTitle.value = '添加菜单'
  isEditMode.value = false
  dialogVisible.value = true
}

// 打开编辑菜单对话框
const openEditMenuDialog = (menu: MenuItem) => {
  dialogTitle.value = '编辑菜单'
  isEditMode.value = true
  currentEditId.value = menu.id
  
  // 填充表单数据
  menuForm.title = menu.title
  menuForm.path = menu.path
  menuForm.icon = menu.icon || ''
  menuForm.order = menu.order || 0
  menuForm.enabled = menu.enabled
  
  dialogVisible.value = true
}

// 处理删除菜单
const handleDeleteMenu = (menu: MenuItem) => {
  ElMessageBox.confirm(
    `确定要删除菜单"${menu.title}"吗？`,
    '确认删除',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    menuStore.removeMenu(menu.id)
    ElMessage.success('删除成功')
  }).catch(() => {
    // 取消删除
  })
}

// 处理保存菜单
const handleSaveMenu = async () => {
  if (!menuFormRef.value) return
  
  await menuFormRef.value.validate((valid) => {
    if (valid) {
      if (isEditMode.value) {
        // 编辑模式
        menuStore.updateMenu(currentEditId.value, { ...menuForm })
        ElMessage.success('更新成功')
      } else {
        // 添加模式
        menuStore.addMenu({ ...menuForm })
        ElMessage.success('添加成功')
      }
      
      dialogVisible.value = false
    }
  })
}

// 处理对话框关闭
const handleDialogClose = () => {
  // 重置表单
  menuForm.title = ''
  menuForm.path = ''
  menuForm.icon = ''
  menuForm.order = 0
  menuForm.enabled = true
  
  if (menuFormRef.value) {
    menuFormRef.value.resetFields()
  }
}
</script>

<style scoped>
.menu-management {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.menu-card {
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>