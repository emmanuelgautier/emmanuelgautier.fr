import clsx from 'clsx'
import { useAmp } from 'next/amp'

interface Props {
  className?: string
  title: string,
  height?: number,
  width?: number
}

function ProfileImage({ className, title, height = 100, width = 100 }: Props) {
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
    <picture>
      <source
        srcSet={require('../public/images/profile.png?webp')}
        type="image/webp"
      />
      <source
        srcSet={require('../public/images/profile.png')}
        type="image/png"
      />
      <img
        className={classes}
        src={require('../public/images/profile.png')}
        alt={title}
        title={title}
        height={height}
        width={width}
      />
    </picture>
  )
}

export default ProfileImage
