import style from './ProjectPage.module.scss'
import { NewTaskForm } from '../NewTaskForm/NewTaskForm'
import { useSelector } from 'react-redux'
import { IRootState, ITask, moveTask } from '../../store'
import { TaskColumn } from '../TasksColumn/TasksColumn'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { useDispatch } from 'react-redux'

export const ProjectPage = () => {

  const state = useSelector<IRootState, IRootState>((state) => state)
  const dispatch = useDispatch()

  const handleDragEnd = (result: DropResult) => {
    const { destination, source } = result

    // Если таск переносится за пределы списков
    if (!destination) return

    // Если таск переносится в то же место
    if (destination.droppableId === source.droppableId && destination.index === source.index) return

    // Если таск переносится на другую позицию в том же списке
    if (destination.droppableId === source.droppableId) {

      const tasksList = state[source.droppableId.toLowerCase() as keyof IRootState]

      if (!Array.isArray(tasksList)) return

      const movedTask = tasksList.splice(source.index, 1)[0]
      tasksList.splice(destination.index, 0, movedTask)
      const newState = { ...state, [source.droppableId.toLowerCase()]: tasksList }
      dispatch(moveTask(newState))
      return
    }

    // Если таск переносится в другой список
    const sourceTasksList = state[source.droppableId.toLowerCase() as keyof IRootState]
    const destTasksList = state[destination.droppableId.toLowerCase() as keyof IRootState]

    if (!Array.isArray(sourceTasksList) || !Array.isArray(destTasksList)) return

    const movedTask = sourceTasksList.splice(source.index, 1)[0]
    destTasksList.splice(destination.index, 0, movedTask)
    const newState = {
      ...state,
      [source.droppableId.toLowerCase()]: sourceTasksList,
      [destination.droppableId.toLowerCase()]: destTasksList
    }
    dispatch(moveTask(newState))
  }

  return (
    <section className={style.projectSection}>
      <div className={`container ${style.container}`}>
        <NewTaskForm />
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className={style.tasksBlockWrapper}>
            <TaskColumn listName='Queue' tasks={state.queue} />
            <TaskColumn listName='Development' tasks={state.development} />
            <TaskColumn listName='Done' tasks={state.done} />
          </div>
        </DragDropContext>
      </div>
    </section>
  )
}
