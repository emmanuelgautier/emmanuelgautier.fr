import clsx from 'clsx'
import { useAmp } from 'next/amp'

import ProfilePic from '../public/images/profile.png'

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
  const isAmp = useAmp()
  const classes = clsx('object-cover rounded-full', className)

  return isAmp ? (
    <amp-img
      className={classes}
      src={ProfilePic}
      alt={title}
      height={height.toString()}
      width={width.toString()}
    />
  ) : (
    <img
      className={classes}
      src={ProfilePic}
      alt={title}
      title={title}
      height={height}
      width={width}
    />
  )
}

export default ProfileImage
