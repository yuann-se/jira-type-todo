import { ITask, IRootState } from "."

export const addNewTask = (payload: ITask) => ({
  type: 'ADD_NEW_TASK',
  payload
})

export const editTask = (payload: { task: ITask, listName: string }) => ({
  type: 'EDIT_TASK',
  payload
})

export const removeTask = (payload: { taskId: number, listName: string }) => ({
  type: 'REMOVE_TASK',
  payload
})

export const addSubtask = (payload: { subtask: ITask, listName: string, parentId: number }) => ({
  type: 'ADD_SUBTASK',
  payload
})

export const editSubtask = (payload: { subtask: ITask, listName: string, parentId: number }) => ({
  type: 'EDIT_SUBTASK',
  payload
})

export const removeSubtask = (payload: { subtaskId: number, listName: string, parentId: number }) => ({
  type: 'REMOVE_SUBTASK',
  payload
})

export const moveTask = (payload: IRootState) => ({
  type: 'MOVE_TASK',
  payload
})

export const addComment = (payload: { comment: string, taskId: number, parentId?: number, listName: string }) => ({
  type: 'ADD_COMMENT',
  payload
})

export const removeComment = (payload: { commentId: number, taskId: number, listName: string }) => ({
  type: 'REMOVE_COMMENT',
  payload
})
