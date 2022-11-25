import style from './ProjectPage.module.scss'
import React from "react"
import { NewTaskForm } from '../NewTaskForm/NewTaskForm'

export const ProjectPage = () => {
  return (
    <section className={style.projectSection}>
      <div className={`container ${style.container}`}>
        <NewTaskForm />
        <div className={style.tasksBlockWrapper}>
          <div className={style.tasksBlock}>
            <h3>Queue</h3>
          </div>
          <div className={style.tasksBlock}>
            <h3>Development</h3>
          </div>
          <div className={style.tasksBlock}>
            <h3>Done</h3>
          </div>
        </div>
      </div>
    </section>
  )
}
