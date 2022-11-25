import style from "./SelectProjectPage.module.scss"
import React from "react"
import { Link, useRouteMatch } from "react-router-dom"

interface IProps { }

export const SelectProjectPage = ({ }: IProps) => {
  const { url } = useRouteMatch()
  return (
    <section className={style.selectProjectSection}>
      <div className={`container ${style.container}`}>
        <h2 className={style.header}>Projects:</h2>
        <Link className={style.link} to={`${url}/newProject`}>New Project</Link>
      </div>
    </section>
  )
}
