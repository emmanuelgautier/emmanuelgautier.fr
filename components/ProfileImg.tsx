/* eslint-disable @next/next/no-img-element */
import clsx from 'clsx'

interface Props {
  className?: string
  title: string
  height?: number
  width?: number
  priority?: boolean
}

const ProfileImage: React.FC<Props> = ({ className, ...props }) => {
  const classes = clsx('object-cover rounded-full', className)

  return (
    <img
      className={classes}
      src="/images/profile.png"
      alt={props.title}
      {...props}
    />
  )
}

export default ProfileImage
