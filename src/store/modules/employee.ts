import { defineStore } from 'pinia'

// 员工信息接口定义
export interface Employee {
  id: number
  name: string
  email: string
  department: string
  position: string
  hireDate: string
  salary: number
}

// 员工状态管理
export const useEmployeeStore = defineStore('employee', {
  state: () => ({
    employees: [] as Employee[],
    currentEmployee: null as Employee | null
  }),
  
  actions: {
    // 添加员工
    addEmployee(employee: Omit<Employee, 'id'>) {
      const newEmployee = {
        ...employee,
        id: Date.now() // 简单生成唯一ID
      }
      this.employees.push(newEmployee)
    },
    
    // 更新员工信息
    updateEmployee(employee: Employee) {
      const index = this.employees.findIndex(e => e.id === employee.id)
      if (index !== -1) {
        this.employees[index] = employee
      }
    },
    
    // 删除员工
    deleteEmployee(id: number) {
      this.employees = this.employees.filter(e => e.id !== id)
    },
    
    // 设置当前员工
    setCurrentEmployee(employee: Employee | null) {
      this.currentEmployee = employee
    }
  }
})