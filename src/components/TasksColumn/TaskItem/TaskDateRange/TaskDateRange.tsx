import { AiOutlineCalendar } from "react-icons/ai"
import style from './TaskDateRange.module.scss'

interface IProps {
  creationDate: Date
  finishDate: Date
}

export const TaskDateRange = ({ creationDate, finishDate }: IProps) => {
  return (
    <div className={style.dateRange}>
      <AiOutlineCalendar size={'1.2em'} />
      <span>{new Date(creationDate).toLocaleDateString('en-EN', { month: 'short', day: 'numeric' })} - {new Date(finishDate).toLocaleDateString('en-EN', { month: 'short', day: 'numeric' })}</span>
    </div>
  )
}
