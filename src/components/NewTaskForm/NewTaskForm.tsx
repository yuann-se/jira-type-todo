import style from './NewTaskForm.module.scss'
import { FormEvent, useRef, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { EPriority, EStatus, IRootState, ITask } from '../../store'
import { addSubtask, addNewTask, editTask, removeTask, removeSubtask, editSubtask } from '../../store/actionCreators'
import DatePicker from 'react-date-picker'
import { MdFileDownloadDone } from "react-icons/md"
import { RiDeleteBin7Line } from "react-icons/ri"
import Select from 'react-select'
import { useHistory } from 'react-router-dom'

interface IProps {
  isSubtask?: boolean
  subtaskId?: number
  parentTaskId?: number
  listName?: string
  onSubmit?: () => void
  isEdit?: boolean
  task?: ITask
}

export const NewTaskForm = ({ isSubtask, parentTaskId, listName, onSubmit, isEdit, task }: IProps) => {

  const [dateValue, setDateValue] = useState(isEdit ? new Date(task!.finishDate) : new Date())
  const [priority, setPriority] = useState<EPriority>(EPriority.medium)
  const [status, setStatus] = useState<EStatus>(EStatus.queue)

  const taskNumber = useSelector<IRootState, number>((state) => state.taskIds)
  const subtaskNumber = useSelector<IRootState, number>((state) => state.otherIds)

  const titleRef = useRef<HTMLInputElement>(null)
  const descrRef = useRef<HTMLTextAreaElement>(null)

  const dispatch = useDispatch()
  const history = useHistory()

  const priorityOptions = [
    { value: EPriority.high, label: 'high' },
    { value: EPriority.medium, label: 'medium' },
    { value: EPriority.low, label: 'low' }
  ]

  const statusOptions = [
    { value: EStatus.queue, label: 'queue' },
    { value: EStatus.dev, label: 'dev' },
    { value: EStatus.done, label: 'done' }
  ]

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!titleRef.current?.value.trim() || !dateValue) return

    const newTask: ITask = {
      id: isEdit ? task!.id : isSubtask ? subtaskNumber : taskNumber,
      title: titleRef.current.value.trim(),
      descr: descrRef.current?.value ? descrRef.current?.value : '',
      creationDate: isEdit ? task!.creationDate : new Date(),
      finishDate: dateValue,
      priority: priority,
      subtasks: isEdit ? task!.subtasks : [],
      comments: isEdit ? task!.comments : [],
      status: isSubtask ? status : null
    }

    if (onSubmit) onSubmit()

    if (isEdit && isSubtask && listName && parentTaskId) {
      dispatch(editSubtask({ subtask: newTask, listName: listName, parentId: parentTaskId }))
      return
    }

    if (isEdit && task && listName) {
      dispatch(editTask({ task: newTask, listName: listName }))
      return
    }

    if (isSubtask && listName && parentTaskId) {
      dispatch(addSubtask({ subtask: newTask, listName: listName, parentId: parentTaskId }))
      return
    }

    dispatch(addNewTask(newTask))
  }

  const handleDelete = () => {
    if (!task || !listName) return

    if (isEdit && isSubtask && parentTaskId) {
      dispatch(removeSubtask({ subtaskId: task.id, listName: listName, parentId: parentTaskId }))
      return
    }

    history.push('/projects/newProject')
    setTimeout(() => {
      dispatch(removeTask({ taskId: task.id, listName: listName }))
    }, 500)

  }

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <div className={style.contentWrapper}>

        <div className={style.inputWrapper}>
          <label htmlFor="title" className={style.label}>Title</label>
          <input
            type="text"
            name='title'
            className={style.input}
            ref={titleRef}
            defaultValue={isEdit ? task?.title : ''}
          />
        </div>

        <div className={style.inputWrapper}>
          <label htmlFor="descr" className={style.label}>Description</label>
          <textarea
            rows={3}
            name='descr'
            className={style.input}
            ref={descrRef}
            defaultValue={isEdit ? task?.descr : ''}
          />
        </div>

        <div className={style.inputWrapper}>
          <label className={style.label}>Priority</label>
          <Select
            className={style.select}
            options={priorityOptions}
            defaultValue={isEdit ? { value: task?.priority, label: `${task?.priority}` } : priorityOptions[1]}
            onChange={(choice) => setPriority(choice?.value || EPriority.medium)}
          />
        </div>

        {isSubtask && isEdit && (
          <div className={style.inputWrapper}>
            <label className={style.label}>Status</label>
            <Select
              className={style.select}
              options={statusOptions}
              defaultValue={isEdit ? { value: task?.status, label: `${task?.status}` } : statusOptions[0]}
              onChange={(choice) => setStatus(choice?.value || EStatus.queue)}
            />
          </div>
        )}

        <div className={style.inputWrapper}>
          <label htmlFor="finishDate" className={style.label}>Finish Date</label>
          <DatePicker
            value={dateValue}
            onChange={(date: Date) => setDateValue(date)}
            minDate={new Date()}
            required
            className={style.datePicker}
            calendarClassName={style.calendar}
          />
        </div>

        <div className={style.btnsWrapper}>
          <button className={`baseBtn ${style.addBtn}`}>
            <MdFileDownloadDone size='1.2em' />
            <span>{isEdit ? 'Save' : 'Add'}</span>
          </button>

          {isEdit && (
            <button type='button' className={`baseBtn ${style.removeBtn}`} onClick={handleDelete}>
              <RiDeleteBin7Line size='1.2em' />
              <span>Delete</span>
            </button>
          )}
        </div>

      </div>
    </form>
  )
}
