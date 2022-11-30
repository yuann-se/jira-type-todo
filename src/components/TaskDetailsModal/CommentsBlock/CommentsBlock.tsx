import { FormEvent, useState } from "react"
import { useDispatch } from "react-redux"
import { CSSTransition } from "react-transition-group"
import { ITask } from "../../../store"
import { addComment } from "../../../store/actionCreators"
import { AddBtn } from "../../UI/AddBtn/AddBtn"
import { AddCommentForm } from "./AddCommentForm/AddCommentForm"
import { Comments } from "./Comments/Comments"
import style from './CommentsBlock.module.scss'

interface IProps {
  task: ITask
  listName: string
}

export const CommentsBlock = ({ task, listName }: IProps) => {

  const [isAddCommentFormOpen, setIsAddCommentFormOpen] = useState(false)

  const dispatch = useDispatch()

  const handleSubmitComment = (text: string | undefined) => (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (text) {
      dispatch(addComment({ comment: text, taskId: task.id, listName: listName }))
    }

    setIsAddCommentFormOpen((prev) => !prev)
  }

  return (
    <div>
      {!!task.comments?.length && (
        <>
          <h4 className={style.header}>Comments:</h4>

          <Comments commentsList={task.comments} taskId={task.id} listName={listName} />
        </>
      )}

      <CSSTransition
        in={isAddCommentFormOpen}
        timeout={500}
        classNames='addNewTaskForm'
        mountOnEnter
        unmountOnExit
      >
        <AddCommentForm onSubmit={handleSubmitComment} />
      </CSSTransition>

      <AddBtn
        onClick={() => setIsAddCommentFormOpen((prev) => !prev)}
        isOpen={isAddCommentFormOpen}
        text='Add comment'
      />

    </div>
  )
}
