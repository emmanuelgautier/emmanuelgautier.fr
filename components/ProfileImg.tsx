import Img from 'next/image'
import clsx from 'clsx'

interface Props {
  className?: string
  title: string
  height: number
  width: number
  priority?: boolean
}

const ProfileImg: React.FC<Props> = ({ className, ...props }) => {
  const classes = clsx('object-cover rounded-full', className)

  return (
    <Img
      className={classes}
      src="/images/profile.png"
      alt={props.title}
      {...props}
    />
  )
}

export default ProfileImg
