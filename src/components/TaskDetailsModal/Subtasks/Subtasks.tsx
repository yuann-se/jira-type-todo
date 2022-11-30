import { useState } from "react"
import { useDispatch } from "react-redux"
import { ITask } from "../../../store"
import { removeSubtask } from "../../../store/actionCreators"
import { NewTaskForm } from "../../NewTaskForm/NewTaskForm"
import { CSSTransition, TransitionGroup } from "react-transition-group"
import style from './Subtasks.module.scss'
import { AddBtn } from "../../UI/AddBtn/AddBtn"
import { TaskDateRange } from "../../TasksColumn/TaskItem/TaskDateRange/TaskDateRange"
import { TaskPriority } from "../../TasksColumn/TaskItem/TaskPriority/TaskPriority"

interface IProps {
  task: ITask
  listName: string
}

interface IEditForm {
  [id: number]: boolean
}

export const Subtasks = ({ task, listName }: IProps) => {

  const [isAddSubtaskFormOpen, setIsAddSubtaskFormOpen] = useState(false)
  const [isEditFormOpen, setIsEditFormOpen] = useState<IEditForm>({})

  const dispatch = useDispatch()

  const handleRemoveSubtask = (subtaskId: number) => {
    dispatch(removeSubtask({ subtaskId: subtaskId, listName: listName, parentId: task.id }))
  }

  const handleOpenForm = (stId: number) => {
    isEditFormOpen[stId as keyof IEditForm]
      ? setIsEditFormOpen({ ...isEditFormOpen, [stId]: false })
      : setIsEditFormOpen({ ...isEditFormOpen, [stId]: true })
  }

  return (
    <>
      {!!task.subtasks.length && (
        <>
          <h4 className={style.header}>Subtasks:</h4>
          <ul>
            <TransitionGroup>
              {task.subtasks.map((subtask) => (
                <CSSTransition
                  key={subtask.id}
                  timeout={500}
                  classNames="subtask"
                >
                  <li className={style.subtask}>

                    <h5 className={`iconWithText ${style.title}`}>
                      <TaskPriority priority={subtask.priority} />
                      <span>{subtask.title}</span>
                    </h5>

                    {subtask.descr && <p className={style.taskDescr}>{subtask.descr}</p>}

                    <div className={style.meta}>
                      <TaskDateRange creationDate={subtask.creationDate} finishDate={subtask.finishDate} />

                      <p className={style.editBtn}>
                        <AddBtn
                          onClick={() => handleOpenForm(subtask.id)}
                          isOpen={isEditFormOpen[subtask.id]}
                          text='Edit'
                          isEdit
                        />
                      </p>
                    </div>

                    <CSSTransition
                      in={isEditFormOpen[subtask.id]}
                      timeout={500}
                      classNames='addNewTaskForm'
                      mountOnEnter
                      unmountOnExit
                    >
                      <NewTaskForm
                        isEdit
                        isSubtask
                        task={subtask}
                        parentTaskId={task.id}
                        listName={listName}
                        onSubmit={() => setIsEditFormOpen({ ...isEditFormOpen, [subtask.id]: false })}
                      />
                    </CSSTransition>
                  </li>
                </CSSTransition>
              ))}
            </TransitionGroup>
          </ul>
        </>
      )}

      <AddBtn
        onClick={() => setIsAddSubtaskFormOpen((prev) => !prev)}
        isOpen={isAddSubtaskFormOpen}
        text={'Add subtask'}
      />

      <CSSTransition
        in={isAddSubtaskFormOpen}
        timeout={500}
        classNames='addNewTaskForm'
        mountOnEnter
        unmountOnExit
      >
        <NewTaskForm
          isSubtask
          parentTaskId={task.id}
          listName={listName}
          onSubmit={() => setIsAddSubtaskFormOpen(false)}
        />
      </CSSTransition>

    </>
  )
}
