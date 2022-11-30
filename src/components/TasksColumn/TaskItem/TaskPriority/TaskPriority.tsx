import { EPriority } from "../../../../store"
import { BsFillBrightnessLowFill, BsBrightnessAltLowFill, BsBrightnessAltLow } from "react-icons/bs"
import ReactTooltip from 'react-tooltip'

interface IProps {
  priority: EPriority
}

export const TaskPriority = ({ priority }: IProps) => {
  return (
    <div className='iconWithText'>
      {priority === EPriority.high &&
        <BsFillBrightnessLowFill
          data-padding='15px'
          data-effect='solid'
          data-tip={`Priority: ${priority}`}
          size={'1.5em'}
          color='#dc5782'
        />}

      {priority === EPriority.medium &&
        <BsBrightnessAltLowFill
          data-padding='15px'
          data-effect='solid'
          data-tip={`Priority: ${priority}`}
          size={'1.5em'}
          color='#dca80d'
        />}

      {priority === EPriority.low &&
        <BsBrightnessAltLow
          data-padding='15px'
          data-effect='solid'
          data-tip={`Priority: ${priority}`}
          size={'1.5em'}
          color='#3fb272'
        />}

      <ReactTooltip />
    </div>
  )
}
