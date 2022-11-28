import style from './NewTaskForm.module.scss'

import React, { FormEvent, useRef, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { addNewTask, addSubtask, IRootState, ITask } from '../../store'

interface IProps {
  isSubtask?: boolean
  parentTaskId?: number
  listName?: string
}

export const NewTaskForm = ({ isSubtask, parentTaskId, listName }: IProps) => {

  const taskNumber = useSelector<IRootState, number>((state) => state.taskIds)
  const subtaskNumber = useSelector<IRootState, number>((state) => state.otherIds)

  const titleRef = useRef<HTMLInputElement>(null)
  const dateRef = useRef<HTMLInputElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (titleRef.current?.value.trim() && dateRef.current?.value) {

      const newTask: ITask = {
        id: isSubtask ? subtaskNumber : taskNumber,
        title: titleRef.current.value.trim(),
        creationDate: new Date(),
        finishDate: dateRef.current.value,
        priority: 'low',
        subtasks: [],
        comments: [],
        files: fileRef.current?.files ? fileRef.current?.files : undefined
      }

      if (isSubtask && listName && parentTaskId) {
        dispatch(addSubtask({
          subtask: newTask,
          listName: listName,
          parentId: parentTaskId
        }))
      }
      else { dispatch(addNewTask(newTask)) }

      titleRef.current.value = ''
      dateRef.current.value = ''
      if (fileRef.current) fileRef.current.value = ''
    }
  }
  return (
    <div>
      <form className={style.form} onSubmit={handleSubmit}>
        <label htmlFor="title" className={style.label}>Title</label>
        <input type="text" name='title' className={style.input} ref={titleRef} />

        <label htmlFor="descr" className={style.label}>Description</label>
        <input type="text" name='descr' className={style.input} />

        <label htmlFor="finishDate" className={style.label}>Finish Date</label>
        <input type="date" name='finishDate' className={style.input} ref={dateRef} />

        {/* <label htmlFor="file" className={style.label}>Finish Date</label> */}
        <input type="file" multiple name='file' className={style.input} ref={fileRef} onChange={() => console.log(fileRef.current?.files)} />

        <button>Add</button>
      </form>
    </div>
  )
}
