import React from 'react'

type LayoutProps = {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => <main>{children}</main>

export default Layout
