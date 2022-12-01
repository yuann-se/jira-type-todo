import { Draggable } from "react-beautiful-dnd"
import { Link, Switch, Route, useLocation } from "react-router-dom"
import { CSSTransition, TransitionGroup } from "react-transition-group"
import { ITask } from "../../../store"
import { TaskDetailsModal } from "../../TaskDetailsModal/TaskDetailsModal"
import style from './TaskItem.module.scss'
import { MdOutlineModeComment, MdOutlineLink } from "react-icons/md"
import { TaskPriority } from "./TaskPriority/TaskPriority"
import { TaskTitle } from "./TaskTitle/TaskTitle"
import { TaskDateRange } from "./TaskDateRange/TaskDateRange"
import { TaskStatus } from "./TaskStatus/TaskStatus"

interface IProps {
  task: ITask
  ind: number
  listName: string
}

export const TaskItem = ({ task, ind, listName }: IProps) => {

  const location = useLocation()

  return (
    <Draggable draggableId={`${task.id}`} index={ind}>
      {(draggableProvided, draggableSnapshot) => (
        (
          <li
            className={`${style.task} ${draggableSnapshot.isDragging ? style.isDragging : ''}`}
            ref={draggableProvided.innerRef}
            {...draggableProvided.draggableProps}
            {...draggableProvided.dragHandleProps}
          >
            <Link to={`/projects/newProject/task${task.id}?id=${task.id}&listname=${listName}`}>

              <TaskTitle taskId={task.id} taskTitle={task.title} listName={listName} />

              <div className={style.meta}>

                <TaskDateRange creationDate={task.creationDate} finishDate={task.finishDate} />

                <div className={style.innerWrapper}>
                  <p className={style.commentsCount}>
                    <MdOutlineModeComment />
                    <span>{task.comments?.length || 0}</span>
                  </p>

                  <p className={style.commentsCount}>
                    <MdOutlineLink size={'1.5em'} />
                    <span>{task.subtasks?.length || 0}</span>
                  </p>

                  <TaskPriority priority={task.priority} />
                </div>

              </div>

              {!!task.subtasks.length &&
                <ul className={style.stLisk}>
                  {task.subtasks.map((subtask) => (
                    <li key={subtask.id} className={style.subtaskItem}>
                      <TaskPriority priority={subtask.priority} />
                      <p className={style.stTitle}>{subtask.title}</p>
                      {!!subtask.status && (
                        <TaskStatus status={subtask.status} />
                      )}
                    </li>
                  ))}
                </ul>
              }
            </Link>

            {/* Эта конструкция нужна для того, чтобы роутинг работал вместе с транзишеном */}
            <TransitionGroup>
              <CSSTransition
                key={location.pathname}
                timeout={400}
                classNames='modal'
                mountOnEnter
                unmountOnExit
              >
                <Switch location={location}>
                  <Route path={`/projects/newProject/task${task.id}`}>
                    <TaskDetailsModal />
                  </Route>
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          </li>
        )
      )}
    </Draggable>
  )
}
