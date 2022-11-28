import { FormEvent, Fragment, useState } from "react"
import { useDispatch } from "react-redux"
import { addComment, IComment, removeComment } from "../../../../store"
import { AddCommentForm } from "../AddCommentForm/AddCommentForm"
import style from './Comments.module.scss'

interface IProps {
  commentsList: IComment[]
  taskId: number
  listName: string
  parentId?: number
}

interface IReplyForm {
  [id: number]: boolean
}

export const Comments = ({ commentsList, taskId, listName, parentId }: IProps) => {

  if (typeof parentId === 'undefined') parentId = -1

  const [isReplyFormOpen, setIsReplyFormOpen] = useState<IReplyForm>({})

  const dispatch = useDispatch()

  console.log(parentId)

  const handleOpenForm = (id: number) => {
    isReplyFormOpen[id as keyof IReplyForm]
      ? setIsReplyFormOpen({ ...isReplyFormOpen, [id]: false })
      : setIsReplyFormOpen({ ...isReplyFormOpen, [id]: true })
  }

  const handleSubmitReply = (commentId: number) => (text: string | undefined) => (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(commentId, text)

    if (text) {
      dispatch(addComment({ comment: text, taskId, parentId: commentId, listName }))
    }

    setIsReplyFormOpen({ ...isReplyFormOpen, [commentId]: false })
  }

  const handleDeleteComment = (commentId: number) => {
    dispatch(removeComment({ commentId, taskId, listName }))
  }

  return (
    <div className={style.commentsWrapper}>
      {commentsList.map((comment) => {
        if (comment.parentId === parentId) {
          return (<Fragment key={comment.id}>
            <p className={style.commentBody}>{comment.body}</p>
            <button onClick={() => handleOpenForm(comment.id)}>{isReplyFormOpen[comment.id] ? 'Cancel' : 'Reply'}</button>

            {isReplyFormOpen[comment.id] && (<AddCommentForm onSubmit={handleSubmitReply(comment.id)} />)}

            <button onClick={() => handleDeleteComment(comment.id)}>Delete Comment</button>

            {commentsList.some(item => item.parentId === comment.id) && (
              <Comments commentsList={commentsList} taskId={taskId} listName={listName} parentId={comment.id} />
            )}

          </Fragment>)
        }
      }

      )}
    </div>
  )
}
