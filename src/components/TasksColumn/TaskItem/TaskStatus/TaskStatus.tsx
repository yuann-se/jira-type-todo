import style from './TaskStatus.module.scss'

interface IProps {
  status: string
}

export const TaskStatus = ({ status }: IProps) => {

  if (status === 'Development') status = 'Dev'

  return (
    <span className={`${style.taskStatus} ${style[status]}`}>{status}</span>
  )
}
