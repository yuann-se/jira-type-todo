import { FormEvent, FormEventHandler, useState } from "react"

interface IProps {
  onSubmit: (text: string | undefined) => FormEventHandler<HTMLFormElement>
}

export const AddCommentForm = ({ onSubmit }: IProps) => {

  const [comment, setComment] = useState('')

  return (
    <form onSubmit={onSubmit(comment.trim())}>
      <input
        value={comment}
        onChange={(e: FormEvent<HTMLInputElement>) => setComment(e.currentTarget.value)}
      />
      <button>Comment</button>
    </form>
  )
}
