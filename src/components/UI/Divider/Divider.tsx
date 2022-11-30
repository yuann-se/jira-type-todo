import style from './Divider.module.scss'

interface IProps {
  mt: string
  mb: string
}

export const Divider = ({ mt, mb }: IProps) => {
  return (
    <div className={style.divider} style={{ marginTop: mt, marginBottom: mb }} />
  )
}
