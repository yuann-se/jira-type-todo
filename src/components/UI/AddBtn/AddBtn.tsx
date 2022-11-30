import { MdAddCircleOutline, MdOutlineCancel } from "react-icons/md"
import { AiFillEdit } from "react-icons/ai"

interface IProps {
  text: string
  onClick: () => void
  isOpen: boolean
  isEdit?: boolean
}

export const AddBtn = ({ text, onClick, isOpen, isEdit }: IProps) => {
  return (
    <button className={`baseBtn`} onClick={() => onClick()}>
      {isOpen
        ? <MdOutlineCancel size='1.2em' />
        : isEdit ? <AiFillEdit /> : <MdAddCircleOutline size='1.2em' />}

      <span>{isOpen ? 'Cancel' : text}</span>
    </button>
  )
}
