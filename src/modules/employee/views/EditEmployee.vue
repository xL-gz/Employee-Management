<template>
  <div class="edit-employee">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>编辑员工</span>
        </div>
      </template>
      
      <el-form 
        ref="formRef" 
        :model="employeeForm" 
        :rules="rules" 
        label-width="100px"
        @submit.prevent="handleSubmit"
      >
        <el-form-item label="ID" prop="id">
          <el-input v-model="employeeForm.id" disabled />
        </el-form-item>
        
        <el-form-item label="姓名" prop="name">
          <el-input v-model="employeeForm.name" />
        </el-form-item>
        
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="employeeForm.email" />
        </el-form-item>
        
        <el-form-item label="部门" prop="department">
          <el-select v-model="employeeForm.department" placeholder="请选择部门">
            <el-option label="技术部" value="技术部" />
            <el-option label="销售部" value="销售部" />
            <el-option label="人事部" value="人事部" />
            <el-option label="财务部" value="财务部" />
          </el-select>
        </el-form-item>
        
        <el-form-item label="职位" prop="position">
          <el-input v-model="employeeForm.position" />
        </el-form-item>
        
        <el-form-item label="入职日期" prop="hireDate">
          <el-date-picker 
            v-model="employeeForm.hireDate" 
            type="date" 
            placeholder="选择入职日期"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            style="width: 100%"
          />
        </el-form-item>
        
        <el-form-item label="薪资" prop="salary">
          <el-input-number 
            v-model="employeeForm.salary" 
            :min="0" 
            controls-position="right"
            style="width: 100%"
          />
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" @click="handleSubmit">更新</el-button>
          <el-button @click="handleCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { useEmployeeStore, type Employee } from '@/store/modules/employee'

// 路由和状态管理
const route = useRoute()
const router = useRouter()
const employeeStore = useEmployeeStore()

// 表单引用
const formRef = ref<FormInstance>()

// 员工表单数据
const employeeForm = reactive({
  id: 0,
  name: '',
  email: '',
  department: '',
  position: '',
  hireDate: '',
  salary: 0
})

// 表单验证规则
const rules = reactive<FormRules>({
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
  ],
  department: [
    { required: true, message: '请选择部门', trigger: 'change' }
  ],
  position: [
    { required: true, message: '请输入职位', trigger: 'blur' }
  ],
  hireDate: [
    { required: true, message: '请选择入职日期', trigger: 'change' }
  ],
  salary: [
    { required: true, message: '请输入薪资', trigger: 'blur' }
  ]
})

// 初始化表单数据
onMounted(() => {
  const employee = employeeStore.currentEmployee
  if (employee) {
    employeeForm.id = employee.id
    employeeForm.name = employee.name
    employeeForm.email = employee.email
    employeeForm.department = employee.department
    employeeForm.position = employee.position
    employeeForm.hireDate = employee.hireDate
    employeeForm.salary = employee.salary
  } else {
    // 如果没有当前员工信息，返回员工列表
    router.push('/employees')
  }
})

// 处理表单提交
const handleSubmit = async () => {
  if (!formRef.value) return
  
  await formRef.value.validate((valid) => {
    if (valid) {
      employeeStore.updateEmployee({
        id: employeeForm.id,
        name: employeeForm.name,
        email: employeeForm.email,
        department: employeeForm.department,
        position: employeeForm.position,
        hireDate: employeeForm.hireDate,
        salary: employeeForm.salary
      })
      
      ElMessage.success('员工信息更新成功')
      router.push('/employees')
    }
  })
}

// 处理取消
const handleCancel = () => {
  router.push('/employees')
}
</script>

<style scoped>
.edit-employee {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>