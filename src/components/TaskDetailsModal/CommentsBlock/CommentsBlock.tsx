import { FormEvent, useState } from "react"
import { useDispatch } from "react-redux"
import { addComment, ITask } from "../../../store"
import { AddCommentForm } from "./AddCommentForm/AddCommentForm"

import { Comments } from "./Comments/Comments"

interface IProps {
  task: ITask
  listName: string
}

export const CommentsBlock = ({ task, listName }: IProps) => {

  const [isAddCommentFormOpen, setIsAddCommentFormOpen] = useState(false)

  const dispatch = useDispatch()

  const handleOpenForm = () => {
    setIsAddCommentFormOpen((prev) => !prev)
  }

  const handleSubmitComment = (text: string | undefined) => (e: FormEvent<HTMLFormElement>) => {
    console.log(text)
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
          <p>Comments</p>

          <Comments commentsList={task.comments} taskId={task.id} listName={listName} />
        </>
      )}

      <button onClick={handleOpenForm}>{isAddCommentFormOpen ? 'Close' : 'Add Comment'}</button>

      {isAddCommentFormOpen && (<AddCommentForm onSubmit={handleSubmitComment} />)}
    </div>
  )
}
