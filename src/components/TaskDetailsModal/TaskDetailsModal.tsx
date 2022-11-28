import React, { useRef } from "react"
import { createPortal } from "react-dom"
import { useHistory } from "react-router-dom"
import { useDisableScroll } from "../../hooks/useDisableScroll"
import style from './TaskDetailsModal.module.scss'
import { TaskDetailsContent } from "./TaskDetailsContent/TaskDetailsContent"

export const TaskDetailsModal = () => {

  const history = useHistory()
  const modalRef = useRef<HTMLDivElement>(null)

  useDisableScroll()

  const handleOverlayClick = (e: React.SyntheticEvent) => {
    if (e.target instanceof Node && !modalRef.current?.contains(e.target)) {
      e.stopPropagation()
      history.push('/projects/newProject')
    }
  }

  const handleClick = () => {
    history.push('/projects/newProject')
  }

  return createPortal((
    <div className={style.modalWrapper} onClick={handleOverlayClick}>
      <div className={style.modal} ref={modalRef}>
        <button className={style.closeBtn} onClick={handleClick}>X</button>

        <TaskDetailsContent />

      </div>
    </div>
  ), document.getElementById('modal_root')!)
}
