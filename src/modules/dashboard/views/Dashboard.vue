<template>
  <div class="dashboard">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card class="statistic-card">
          <div class="statistic-item">
            <h3>总员工数</h3>
            <p class="statistic-number">{{ employeeCount }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="statistic-card">
          <div class="statistic-item">
            <h3>今日入职</h3>
            <p class="statistic-number">{{ newEmployeesToday }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="statistic-card">
          <div class="statistic-item">
            <h3>部门数</h3>
            <p class="statistic-number">{{ departmentCount }}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="mt-20">
      <el-col :span="16">
        <el-card class="chart-card">
          <template #header>
            <div class="card-header">
              <span>员工统计</span>
            </div>
          </template>
          <div ref="lineChartRef" class="chart-container"></div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="chart-card">
          <template #header>
            <div class="card-header">
              <span>部门分布</span>
            </div>
          </template>
          <div ref="pieChartRef" class="chart-container"></div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="mt-20">
      <el-col :span="24">
        <el-card class="activity-card">
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
import { ref, computed, onMounted, nextTick } from 'vue'
import { useEmployeeStore } from '@/store/modules/employee'
import * as echarts from 'echarts'

// 使用员工状态管理
const employeeStore = useEmployeeStore()

// 图表引用
const lineChartRef = ref<HTMLElement | null>(null)
const pieChartRef = ref<HTMLElement | null>(null)
let lineChart: echarts.ECharts | null = null
let pieChart: echarts.ECharts | null = null

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

// 初始化图表
const initCharts = () => {
  if (lineChartRef.value) {
    lineChart = echarts.init(lineChartRef.value)
    const lineOption = {
      title: {
        text: '月度员工增长'
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, employeeCount.value],
          type: 'line',
          smooth: true
        }
      ]
    }
    lineChart.setOption(lineOption)
  }

  if (pieChartRef.value) {
    pieChart = echarts.init(pieChartRef.value)
    const pieOption = {
      title: {
        text: '部门分布',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          type: 'pie',
          radius: '50%',
          data: [
            { value: 30, name: '技术部' },
            { value: 20, name: '销售部' },
            { value: 15, name: '人事部' },
            { value: 10, name: '财务部' },
            { value: 5, name: '行政部' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
    pieChart.setOption(pieOption)
  }
}

// 窗口大小改变时重置图表
const resizeCharts = () => {
  if (lineChart) {
    lineChart.resize()
  }
  if (pieChart) {
    pieChart.resize()
  }
}

onMounted(() => {
  nextTick(() => {
    initCharts()
    window.addEventListener('resize', resizeCharts)
  })
})

// 组件卸载时清理事件监听器
// eslint-disable-next-line no-unused-vars
const beforeUnmount = () => {
  window.removeEventListener('resize', resizeCharts)
  if (lineChart) {
    lineChart.dispose()
  }
  if (pieChart) {
    pieChart.dispose()
  }
}
</script>

<style scoped>
.dashboard {
  padding: 20px;
}

.statistic-card,
.chart-card,
.activity-card {
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.statistic-item {
  text-align: center;
  padding: 20px 0;
}

.statistic-number {
  font-size: 32px;
  font-weight: bold;
  color: #409eff;
  margin: 10px 0 0;
}

.mt-20 {
  margin-top: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
}

.chart-container {
  width: 100%;
  height: 300px;
}
</style>