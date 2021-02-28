import clsx from 'clsx'
import Link from 'next/link'

interface Props {
  className?: string
}

function Footer({ className }: Props) {
  const classes = clsx('text-gray-500 text-center mb-8', className)

  return (
    <footer className={classes}>
      © <Link href={`/`}>Emmanuel Gautier</Link> - <span>MIT</span>
    </footer>
  )
}

export default Footer
