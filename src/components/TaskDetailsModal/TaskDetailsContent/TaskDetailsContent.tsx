import { useSelector } from "react-redux"
import { useQuery } from "../../../hooks/useQuery"
import { IColumns, IRootState, ITask } from "../../../store"
import { timeSince } from "../../../utils/timeSince"
import { TaskDateRange } from "../../TasksColumn/TaskItem/TaskDateRange/TaskDateRange"
import { TaskPriority } from "../../TasksColumn/TaskItem/TaskPriority/TaskPriority"
import { TaskTitle } from "../../TasksColumn/TaskItem/TaskTitle/TaskTitle"
import { CommentsBlock } from "../CommentsBlock/CommentsBlock"
import { Subtasks } from "../Subtasks/Subtasks"
import style from './TaskDetailsContent.module.scss'
import { AiOutlineFieldTime } from "react-icons/ai"
import { Divider } from "../../UI/Divider/Divider"
import { AddBtn } from "../../UI/AddBtn/AddBtn"
import { useState } from "react"
import { CSSTransition } from "react-transition-group"
import { NewTaskForm } from "../../NewTaskForm/NewTaskForm"

export const TaskDetailsContent = () => {

  const [isEditFormOpen, setIsEditFormOpen] = useState(false)

  let query = useQuery()

  const taskId = query.get("id") || ''
  const listName = query.get('listname') || ''
  const tasks = useSelector<IRootState, ITask[]>((state) => state[listName.toLowerCase() as keyof IColumns])
  const task = tasks.filter((item) => item.id.toString() === taskId)[0]

  return (

    <div className="">

      <div className={style.title}>
        <TaskTitle taskId={task.id} taskTitle={task.title} listName={listName} />
      </div>

      <Divider mt="30px" mb="10px" />

      <div className={style.meta}>
        <TaskDateRange creationDate={task.creationDate} finishDate={task.finishDate} />

        <p className="iconWithText">
          <AiOutlineFieldTime size={'1.3em'} />
          <span>In process for {timeSince(new Date(task.creationDate).getTime())}</span>
        </p>

        <p className="iconWithText">
          <TaskPriority priority={task.priority} />
          <span>Priority: {task.priority}</span>
        </p>

        <p className={style.editBtn}>
          <AddBtn
            onClick={() => setIsEditFormOpen((prev) => !prev)}
            isOpen={isEditFormOpen}
            text='Edit'
            isEdit
          />
        </p>
      </div>

      <CSSTransition
        in={isEditFormOpen}
        timeout={500}
        classNames='addNewTaskForm'
        mountOnEnter
        unmountOnExit
      >
        <NewTaskForm isEdit task={task} listName={listName} onSubmit={() => setIsEditFormOpen(false)} />
      </CSSTransition>

      {task.descr && <p className={style.taskDescr}>{task.descr}</p>}

      <Subtasks task={task} listName={listName} />

      <Divider mt="20px" mb="30px" />

      <CommentsBlock task={task} listName={listName} />

    </div>
  )
}
