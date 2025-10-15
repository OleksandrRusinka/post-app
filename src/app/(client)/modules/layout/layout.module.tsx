import { type FC, type ReactNode } from 'react'

import { Footer } from '@/widgets/footer'
import { Header } from '@/widgets/header'

// interface
interface IProps {
  children: ReactNode
}

// component
const LayoutModule: FC<IProps> = (props) => {
  const { children } = props

  // return
  return (
    <>
      <Header />

      <main className='flex-1 overflow-hidden'>{children}</main>

      <Footer />
    </>
  )
}

export default LayoutModule
