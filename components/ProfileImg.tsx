import clsx from 'clsx'

interface Props {
  className?: string
  title: string
  height?: number
  width?: number
}

const ProfileImage: React.FC<Props> = ({
  className,
  title,
  height = 100,
  width = 100,
}) => {
  const classes = clsx('object-cover rounded-full', className)

  return (
    <img
      className={classes}
      src="./images/profile.png"
      alt={title}
      title={title}
      height={height}
      width={width}
    />
  )
}

export default ProfileImage
