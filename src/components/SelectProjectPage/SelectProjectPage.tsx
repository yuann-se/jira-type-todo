import style from "./SelectProjectPage.module.scss"
import { Link, useRouteMatch } from "react-router-dom"
import { MdOutlineFormatListBulleted } from "react-icons/md"
import { Divider } from "../UI/Divider/Divider"

export const SelectProjectPage = () => {
  const { url } = useRouteMatch()
  return (
    <section className={style.selectProjectSection}>
      <div className={`container ${style.container}`}>
        <h2 className={style.header}>Projects</h2>
        <Divider mt="50px" mb="30px" />
        <Link className={style.link} to={`${url}/newProject`}>
          <MdOutlineFormatListBulleted />
          <span>Project #1</span>
        </Link>
      </div>
    </section>
  )
}
