import React from 'react'

type Props = {
  children: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }) => <main>{children}</main>

export default Layout
