import { useMemo } from "react"
import { useSelector } from "react-redux"
import { useQuery } from "../../../hooks/useQuery"
import { IColumns, IRootState, ITask } from "../../../store"
import { timeSince } from "../../../utils/timeSince"
import { CommentsBlock } from "../CommentsBlock/CommentsBlock"
import { Subtasks } from "../Subtasks/Subtasks"

interface IProps { }

export const TaskDetailsContent = ({ }: IProps) => {

  let query = useQuery()

  const taskId = query.get("id") || ''
  const listName = query.get('listname') || ''
  const tasks = useSelector<IRootState, ITask[]>((state) => state[listName.toLowerCase() as keyof IColumns])
  const task = tasks.filter((item) => item.id.toString() === taskId)[0]

  return (

    <div className="">
      <h4>{task.title}</h4>
      <span>{task.id}</span>
      <p>{task.descr && task.descr}</p>
      <p>Created {new Date(task.creationDate).toLocaleDateString()}</p>
      <p>Finish till {new Date(task.finishDate).toLocaleDateString()}</p>
      <p>Priority: {task.priority}</p>
      <p>Status: {listName}</p>
      <p>In process for {timeSince(new Date(task.creationDate).getTime())}</p>

      <Subtasks task={task} listName={listName} />

      <CommentsBlock task={task} listName={listName} />

    </div>
  )
}
