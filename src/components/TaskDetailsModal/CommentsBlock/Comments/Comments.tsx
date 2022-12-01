import { FormEvent, useState } from "react"
import { useDispatch } from "react-redux"
import { IComment } from "../../../../store"
import { addComment, removeComment } from "../../../../store/actionCreators"
import { AddCommentForm } from "../AddCommentForm/AddCommentForm"
import style from './Comments.module.scss'
import { FaRegUserCircle } from "react-icons/fa"
import { BsReply } from "react-icons/bs"
import { IoMdClose } from "react-icons/io"

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

  const handleOpenForm = (id: number) => {
    isReplyFormOpen[id as keyof IReplyForm]
      ? setIsReplyFormOpen({ ...isReplyFormOpen, [id]: false })
      : setIsReplyFormOpen({ ...isReplyFormOpen, [id]: true })
  }

  const handleSubmitReply = (commentId: number) => (text: string | undefined) => (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

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
          return (
            <div className={style.singleCommentWrapper} key={comment.id}>

              <div className={style.avatar}>
                <FaRegUserCircle size={'2em'} color='#5a51b1' />
              </div>

              <div className={style.content}>
                <p className={style.username}>Username</p>

                <p className={style.commentBody}>{comment.body}</p>

                <div className={style.btnsWrapper}>
                  <button
                    onClick={() => handleOpenForm(comment.id)}
                    className={`iconWithText ${style.replyBtn}`}>
                    {isReplyFormOpen[comment.id] ? <IoMdClose /> : <BsReply />}
                    <span>{isReplyFormOpen[comment.id] ? 'Cancel' : 'Reply'}</span>
                  </button>

                  <button
                    className={`iconWithText ${style.replyBtn}`}
                    onClick={() => handleDeleteComment(comment.id)}>
                    <IoMdClose />
                    <span>Delete</span>
                  </button>
                </div>

                {isReplyFormOpen[comment.id] && (<AddCommentForm onSubmit={handleSubmitReply(comment.id)} />)}

                {commentsList.some(item => item.parentId === comment.id) && (
                  <Comments commentsList={commentsList} taskId={taskId} listName={listName} parentId={comment.id} />
                )}
              </div>
            </div>)
        } else return null
      }

      )}
    </div>
  )
}
