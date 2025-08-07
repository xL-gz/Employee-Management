<template>
  <div class="employee-list">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>员工列表</span>
          <el-button type="primary" @click="handleCreate">添加员工</el-button>
        </div>
      </template>
      
      <el-table :data="employeeStore.employees" style="width: 100%" border>
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="姓名" width="120" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="department" label="部门" width="120" />
        <el-table-column prop="position" label="职位" width="150" />
        <el-table-column prop="hireDate" label="入职日期" width="120" />
        <el-table-column prop="salary" label="薪资" width="100">
          <template #default="scope">
            {{ formatSalary(scope.row.salary) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useEmployeeStore, type Employee } from '@/store/modules/employee'

// 路由和状态管理
const router = useRouter()
const employeeStore = useEmployeeStore()

// 格式化薪资显示
const formatSalary = (salary: number) => {
  return `¥${salary.toLocaleString()}`
}

// 处理创建员工
const handleCreate = () => {
  router.push('/employees/create')
}

// 处理编辑员工
const handleEdit = (employee: Employee) => {
  employeeStore.setCurrentEmployee(employee)
  router.push(`/employees/edit/${employee.id}`)
}

// 处理删除员工
const handleDelete = (employee: Employee) => {
  ElMessageBox.confirm(
    `确定要删除员工 ${employee.name} 吗？`,
    '确认删除',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    employeeStore.deleteEmployee(employee.id)
    ElMessage.success('删除成功')
  }).catch(() => {
    // 用户取消删除
  })
}
</script>

<style scoped>
.employee-list {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>