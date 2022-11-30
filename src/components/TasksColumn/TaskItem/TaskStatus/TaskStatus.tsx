import style from './TaskStatus.module.scss'

interface IProps {
  listName: string
}

export const TaskStatus = ({ listName }: IProps) => {

  return (
    <span className={`${style.taskStatus} ${style[listName]}`}>{listName === 'Development' ? 'Dev' : listName}</span>
  )
}
