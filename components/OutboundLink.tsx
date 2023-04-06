import React from 'react'

interface Props extends React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {}

const OutboundLink: React.FC<Props> = ({
  rel='nofollow noopener noreferrer',
  ...props
}) => (
  <a target="_blank" rel={rel} {...props} />
)

export default OutboundLink
