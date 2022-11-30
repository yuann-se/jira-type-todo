import React from "react"
import { TaskStatus } from "../TaskStatus/TaskStatus"
import style from './TaskTitle.module.scss'

interface IProps {
  taskId: number
  taskTitle: string
  listName: string
}

export const TaskTitle = ({ taskId, taskTitle, listName }: IProps) => {
  return (
    <div className={style.taskTitleWrapper}>
      <span className={style.taskNumber}>{taskId}</span>
      <h4 className={style.taskTitle}>{taskTitle}</h4>
      <TaskStatus listName={listName} />
    </div>
  )
}
