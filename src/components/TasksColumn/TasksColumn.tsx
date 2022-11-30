import { ITask } from "../../store"
import style from './TasksColumn.module.scss'
import { Droppable } from "react-beautiful-dnd"
import { TaskItem } from "./TaskItem/TaskItem"

interface IProps {
  listName: string
  tasks: ITask[]
}

export const TaskColumn = ({ listName, tasks }: IProps) => {

  return (

    <div className={style.tasksBlock}>
      <h3 className={style.listName}>{listName}</h3>
      <Droppable droppableId={listName}>
        {(droppableProvided, droppableSnapshot) => (
          <ul
            className={style.taskList}
            ref={droppableProvided.innerRef}
            {...droppableProvided.droppableProps}
          >
            {tasks.map((task, ind) => {
              return (<TaskItem key={task.id} task={task} ind={ind} listName={listName} />)
            })}
            {droppableProvided.placeholder}
          </ul>
        )}
      </Droppable>
    </div>
  )
}
