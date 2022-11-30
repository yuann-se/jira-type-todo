import { FormEvent, FormEventHandler, useState } from "react"
import style from './AddCommentForm.module.scss'

interface IProps {
  onSubmit: (text: string | undefined) => FormEventHandler<HTMLFormElement>
}

export const AddCommentForm = ({ onSubmit }: IProps) => {

  const [comment, setComment] = useState('')

  return (
    <form className={style.form} onSubmit={onSubmit(comment.trim())}>
      <textarea
        rows={3}
        value={comment}
        placeholder='Add comment...'
        onChange={(e: FormEvent<HTMLTextAreaElement>) => setComment(e.currentTarget.value)}
      />
      <button>Comment</button>
    </form>
  )
}
