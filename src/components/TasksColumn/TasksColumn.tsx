import { ITask } from "../../store"
import style from './TasksColumn.module.scss'
import { timeSince } from "../../utils/timeSince"
import { Draggable, Droppable } from "react-beautiful-dnd"
import { Link, Route, Switch, useLocation } from "react-router-dom"
import { TaskDetailsModal } from "../TaskDetailsModal/TaskDetailsModal"
import { CSSTransition, TransitionGroup } from "react-transition-group"

interface IProps {
  listName: string
  tasks: ITask[]
}

const transitionClasses = {
  enter: style['modal-enter'],
  enterActive: style['modal-enter-active'],
  exit: style['modal-exit'],
  exitActive: style['modal-exit-active']
}

export const TaskColumn = ({ listName, tasks }: IProps) => {

  const location = useLocation()

  return (

    <div className={style.tasksBlock}>
      <h3 className={style.listName}>{listName}</h3>
      <Droppable droppableId={listName}>
        {(droppableProvided, droppableSnapshot) => (
          <ul
            ref={droppableProvided.innerRef}
            {...droppableProvided.droppableProps}
          >
            {tasks.map((task, ind) => {
              return (<Draggable key={task.id} draggableId={`${task.id}`} index={ind}>
                {(draggableProvided, draggableSnapshot) => (
                  (
                    <li
                      className={style.task}
                      ref={draggableProvided.innerRef}
                      {...draggableProvided.draggableProps}
                      {...draggableProvided.dragHandleProps}
                    >
                      <Link to={`/projects/newProject/task${task.id}?id=${task.id}&listname=${listName}`}>
                        <h4>{task.title}</h4>
                        <span>{task.id}</span>
                        {task.descr && <p>{task.descr}</p>}
                        <p>Created {new Date(task.creationDate).toLocaleDateString()}</p>
                        <p>Finish till {new Date(task.finishDate).toLocaleDateString()}</p>
                        <p>Priority: {task.priority}</p>
                        <p>Status: {listName}</p>
                        <p>In process for {timeSince(new Date(task.creationDate).getTime())}</p>
                        {!!task.subtasks.length &&
                          <>
                            <p>Subtasks:</p>
                            <ul>
                              {task.subtasks.map((subtask) => (<li key={subtask.id}>{subtask.title}</li>))}
                            </ul>
                          </>
                        }
                      </Link>

                      {/* Эта конструкция нужна для того, чтобы роутинг работал вместе с транзишеном */}
                      <TransitionGroup>
                        <CSSTransition
                          key={location.pathname}
                          timeout={400}
                          classNames={transitionClasses}
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
              </Draggable>)
            })}
            {droppableProvided.placeholder}
          </ul>
        )}
      </Droppable>
    </div>
  )
}
