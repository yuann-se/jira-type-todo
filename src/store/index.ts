import { legacy_createStore as createStore, Reducer } from "redux"
import { composeWithDevTools } from 'redux-devtools-extension'
import { loadState, saveState } from "../utils/localStorage"

export interface IComment {
  id: number
  parentId: number
  body: string
}

export interface ITask {
  id: number
  title: string
  descr?: string
  creationDate: Date
  finishDate: string
  priority: 'high' | 'medium' | 'low'
  files?: FileList
  subtasks: ITask[]
  comments?: IComment[]
}

export interface IRootState {
  queue: ITask[]
  development: ITask[]
  done: ITask[]
  taskIds: number
  otherIds: number
}

export interface IColumns {
  queue: ITask[]
  development: ITask[]
  done: ITask[]
}

const initialState: IRootState = {
  queue: [],
  development: [],
  done: [],
  taskIds: 1,
  otherIds: 0
}

export const addNewTask = (payload: ITask) => ({
  type: 'ADD_NEW_TASK',
  payload
})

export const addSubtask = (payload: { subtask: ITask, listName: string, parentId: number }) => ({
  type: 'ADD_SUBTASK',
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

const persistedState = loadState()

const rootReducer: Reducer<IRootState> = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_NEW_TASK': return {
      ...state,
      queue: [...state?.queue, action.payload],
      taskIds: state.taskIds + 1
    }

    case 'ADD_SUBTASK': {
      const listName = action.payload.listName.toLowerCase()
      const tasksList = state[listName as keyof IColumns]

      for (let i = 0; i < tasksList.length; ++i) {
        if (tasksList[i].id === action.payload.parentId) {
          tasksList[i] = { ...tasksList[i], subtasks: [...tasksList[i].subtasks, action.payload.subtask] }
          break
        }
      }

      return { ...state, [listName as keyof IRootState]: tasksList, otherIds: state.otherIds + 1 }
    }

    case 'REMOVE_SUBTASK': {
      const listName = action.payload.listName.toLowerCase()
      const tasksList = state[listName as keyof IColumns]

      for (let i = 0; i < tasksList.length; ++i) {
        if (tasksList[i].id === action.payload.parentId) {
          tasksList[i].subtasks = tasksList[i].subtasks.filter((st) => st.id !== action.payload.subtaskId)
          break
        }
      }

      return { ...state, [listName as keyof IColumns]: tasksList }
    }

    case 'ADD_COMMENT': {
      const listName = action.payload.listName.toLowerCase()
      const tasksList = state[listName as keyof IColumns]
      console.log(action.payload.parentId)

      for (let i = 0; i < tasksList.length; ++i) {
        if (tasksList[i].id === action.payload.taskId) {
          const newComment = {
            body: action.payload.comment,
            parentId: typeof action.payload.parentId !== 'undefined' ? action.payload.parentId : -1,
            id: state.otherIds
          }

          let comments = tasksList[i].comments
          tasksList[i].comments = comments && Array.isArray(comments)
            ? [...comments, newComment]
            : [newComment]
          break
        }
      }

      return { ...state, [listName as keyof IColumns]: tasksList, otherIds: state.otherIds + 1 }
    }

    case 'REMOVE_COMMENT': {
      const listName = action.payload.listName.toLowerCase()
      const tasksList = state[listName as keyof IColumns]

      for (let i = 0; i < tasksList.length; ++i) {
        if (tasksList[i].id === action.payload.taskId) {
          tasksList[i].comments = tasksList[i].comments!.filter((comm) => comm.id !== action.payload.commentId)
          break
        }
      }

      return { ...state, [listName as keyof IColumns]: tasksList }
    }

    case 'MOVE_TASK': return action.payload

    default: return state
  }
}
const store = createStore(rootReducer, persistedState, composeWithDevTools())

store.subscribe(() => saveState(store.getState()))

export { store }
