import style from './NewTaskForm.module.scss'

import React from "react"

export const NewTaskForm = () => {
  return (
    <div>
      <form className={style.form}>
        <label htmlFor="title" className={style.label}>Title</label>
        <input type="text" name='title' className={style.input} />

        <label htmlFor="descr" className={style.label}>Description</label>
        <input type="text" name='descr' className={style.input} />

        <label htmlFor="finishDate" className={style.label}>Finish Date</label>
        <input type="date" name='finishDate' className={style.input} />

        <button>Add</button>
      </form>
    </div>
  )
}
