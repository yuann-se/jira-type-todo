import { useState } from "react"
import { useDispatch } from "react-redux"
import { ITask, removeSubtask } from "../../../store"
import { NewTaskForm } from "../../NewTaskForm/NewTaskForm"

interface IProps {
  task: ITask
  listName: string
}

export const Subtasks = ({ task, listName }: IProps) => {

  const [isAddSubtaskFormOpen, setIsAddSubtaskFormOpen] = useState(false)

  const dispatch = useDispatch()

  const handleRemoveSubtask = (subtaskId: number) => {
    dispatch(removeSubtask({ subtaskId: subtaskId, listName: listName, parentId: task.id }))
  }

  const handleOpenAddSubtaskForm = () => {
    setIsAddSubtaskFormOpen((prev) => !prev)
  }

  return (
    <>
      {!!task.subtasks.length && (
        <>
          <p>Subtasks:</p>
          <ul>
            {task.subtasks.map((subtask) => (
              <li key={subtask.id}>
                <span>{subtask.title}</span>
                <button onClick={() => handleRemoveSubtask(subtask.id)}>X</button>
              </li>
            ))}
          </ul>
        </>
      )}

      <button onClick={handleOpenAddSubtaskForm}>{isAddSubtaskFormOpen ? 'Close' : 'Add Subtask'}</button>
      {isAddSubtaskFormOpen && <NewTaskForm isSubtask parentTaskId={task.id} listName={listName} />}
    </>
  )
}
