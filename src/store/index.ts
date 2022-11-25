import { ActionCreator, AnyAction, legacy_createStore as createStore, Reducer } from "redux"
import { persistReducer, persistStore } from "redux-persist"
import storage from "redux-persist/es/storage"

interface IComment {
  body: string
  children: IComment[]
}

export interface ITask {
  id: number
  title: string
  descr?: string
  creationDate: Date
  finishDate: string
  priority: 'high' | 'medium' | 'low'
  files?: any
  subtasks?: ITask
  comments?: IComment[]
}

export interface IRootState {
  queue: ITask[]
  development: ITask[]
  done: ITask[]
  taskNumber: number
}

const initialState: IRootState = {
  queue: [],
  development: [],
  done: [],
  taskNumber: 1
}

export const addNewTask = (payload: ITask) => ({
  type: 'ADD_NEW_TASK',
  payload
})

export const moveTask = (payload: IRootState) => ({
  type: 'MOVE_TASK',
  payload
})

const rootReducer: Reducer<IRootState> = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_NEW_TASK': return { ...state, queue: [...state?.queue, action.payload], taskNumber: state.taskNumber + 1 }
    case 'MOVE_TASK': return action.payload

    default: return state
  }
}

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(persistedReducer)
const persistor = persistStore(store)

export { store, persistor }
