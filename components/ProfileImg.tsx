import clsx from 'clsx'
import { useAmp } from 'next/amp'
import Image from 'next/image'

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
      src={require('../public/images/profile.png')}
      alt={title}
      height={height.toString()}
      width={width.toString()}
    />
  ) : (
    <Image
      src="/images/profile.png"
      alt={title}
      title={title}
      height={height}
      width={width}
    />
  )
}

export default ProfileImage
