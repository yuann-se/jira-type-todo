import { legacy_createStore as createStore, Reducer } from "redux"
import { persistReducer, persistStore } from "redux-persist"
import storage from "redux-persist/es/storage"

interface IComment {
  body: string
  children: IComment[]
}

interface ITask {
  id: number
  title: string
  descr: string
  creationDate: string
  processTime: string
  finishDate: string
  priority: 'high' | 'medium' | 'low'
  files?: any
  status: 'Queue' | 'Development' | 'Done'
  subtasks?: ITask
  comments?: IComment[]
}

interface IInitState {
  tasks: ITask[]
}

const initialState: IInitState = {
  tasks: []
}

const rootReducer: Reducer<IInitState> = (state = initialState, action) => {
  // switch (action.type) {
  //   case value:

  //     break;

  //   default: return state
  // }
  return state
}

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(persistedReducer)
const persistor = persistStore(store)

export { store, persistor }
