export interface TaskListProps {
    id?: number,
    tasks?: any | string
    taskName?: string,
    description?: string,
    handleUpdateTasks?: () => void,
    taskToEdit: string,
  }