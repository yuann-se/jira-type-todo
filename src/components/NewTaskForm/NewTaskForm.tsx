import style from './NewTaskForm.module.scss'

import React, { FormEvent, useRef, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { addNewTask, IRootState } from '../../store'

export const NewTaskForm = () => {

  const taskNumber = useSelector<IRootState, number>((state) => state.taskNumber)

  const titleRef = useRef<HTMLInputElement>(null)
  const dateRef = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (titleRef.current?.value.trim() && dateRef.current?.value) {

      dispatch(addNewTask({
        id: taskNumber,
        title: titleRef.current.value.trim(),
        creationDate: new Date(),
        finishDate: dateRef.current.value,
        priority: 'low'
      }))
      titleRef.current.value = ''
      dateRef.current.value = ''
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

        <button>Add</button>
      </form>
    </div>
  )
}
