<template>
  <div class="dashboard">
    <h1>员工管理系统仪表板</h1>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card>
          <div class="statistic-item">
            <h3>总员工数</h3>
            <p class="statistic-number">{{ employeeCount }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div class="statistic-item">
            <h3>今日入职</h3>
            <p class="statistic-number">{{ newEmployeesToday }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div class="statistic-item">
            <h3>部门数</h3>
            <p class="statistic-number">{{ departmentCount }}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    
    <el-row :gutter="20" class="mt-20">
      <el-col :span="24">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>最近操作</span>
            </div>
          </template>
          <el-table :data="recentActivities" style="width: 100%">
            <el-table-column prop="date" label="日期" width="180" />
            <el-table-column prop="user" label="用户" width="180" />
            <el-table-column prop="action" label="操作" />
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useEmployeeStore } from '@/store/modules/employee'

// 使用员工状态管理
const employeeStore = useEmployeeStore()

// 计算属性
const employeeCount = computed(() => employeeStore.employees.length)
const newEmployeesToday = ref(2)
const departmentCount = ref(5)

// 最近活动数据
const recentActivities = ref([
  {
    date: '2023-06-01 09:30',
    user: '管理员',
    action: '添加新员工：张三'
  },
  {
    date: '2023-06-01 10:15',
    user: '管理员',
    action: '更新员工：李四 的信息'
  },
  {
    date: '2023-06-01 14:20',
    user: '管理员',
    action: '删除员工：王五'
  }
])
</script>

<style scoped>
.dashboard {
  padding: 20px;
}

.statistic-item {
  text-align: center;
}

.statistic-number {
  font-size: 24px;
  font-weight: bold;
  color: #409eff;
  margin: 10px 0;
}

.mt-20 {
  margin-top: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>