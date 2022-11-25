import { ITask } from "../../store"
import style from './TasksColumn.module.scss'
import { timeSince } from "../../utils/timeSince"
import { Draggable, Droppable } from "react-beautiful-dnd"

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
            ref={droppableProvided.innerRef}
            {...droppableProvided.droppableProps}
          >
            {tasks.map((item, ind) => {
              return (<Draggable key={item.id} draggableId={`${item.id}`} index={ind}>
                {(draggableProvided, draggableSnapshot) => (
                  (
                    <li
                      className={style.task}
                      ref={draggableProvided.innerRef}
                      {...draggableProvided.draggableProps}
                      {...draggableProvided.dragHandleProps}
                    >
                      <h4>{item.title}</h4>
                      <p>{item.descr && item.descr}</p>
                      <p>Created {new Date(item.creationDate).toLocaleDateString()}</p>
                      <p>Finish till {new Date(item.finishDate).toLocaleDateString()}</p>
                      <p>Priority: {item.priority}</p>
                      <p>In process for {timeSince(new Date(item.creationDate).getTime())}</p>
                    </li>
                  )
                )}
              </Draggable>)
            })}
            {droppableProvided.placeholder}
          </ul>
        )}
      </Droppable>
    </div>
  )
}
