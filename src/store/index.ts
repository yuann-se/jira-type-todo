import { legacy_createStore as createStore, Reducer } from "redux"
import { composeWithDevTools } from 'redux-devtools-extension'
import { loadState, saveState } from "../utils/localStorage"

export interface IComment {
  id: number
  parentId: number
  body: string
}

export enum EPriority {
  high = 'high',
  medium = 'medium',
  low = 'low'
}

export enum EStatus {
  queue = 'Queue',
  dev = 'Dev',
  done = 'Done'
}

export interface ITask {
  id: number
  title: string
  descr?: string
  creationDate: Date
  finishDate: Date
  priority: EPriority
  status?: EStatus | null
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

const rootReducer: Reducer<IRootState> = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_NEW_TASK': return {
      ...state,
      queue: [...state?.queue, action.payload],
      taskIds: state.taskIds + 1
    }

    case 'EDIT_TASK': {
      const listName = action.payload.listName.toLowerCase()
      const tasksList = state[listName as keyof IColumns]

      for (let i = 0; i < tasksList.length; ++i) {
        if (tasksList[i].id === action.payload.task.id) {
          tasksList[i] = action.payload.task
          break
        }
      }

      return { ...state, [listName as keyof IRootState]: tasksList }
    }

    case 'REMOVE_TASK': {
      const listName = action.payload.listName.toLowerCase()
      let tasksList = state[listName as keyof IColumns]

      tasksList = tasksList.filter((item) => item.id !== action.payload.taskId)

      return { ...state, [listName as keyof IColumns]: tasksList }
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

    case 'EDIT_SUBTASK': {
      const listName = action.payload.listName.toLowerCase()
      const tasksList = state[listName as keyof IColumns]

      for (let i = 0; i < tasksList.length; ++i) {
        if (tasksList[i].id === action.payload.parentId) {
          for (let j = 0; j < tasksList[i].subtasks.length; ++j) {
            if (tasksList[i].subtasks[j].id === action.payload.subtask.id) {
              tasksList[i].subtasks[j] = action.payload.subtask
              break
            }
          }
        }
      }

      return { ...state, [listName as keyof IRootState]: tasksList }
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

const persistedState = loadState()

const store = createStore(rootReducer, persistedState, composeWithDevTools())

store.subscribe(() => saveState(store.getState()))

export { store }
