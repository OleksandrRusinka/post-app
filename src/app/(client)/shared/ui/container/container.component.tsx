import { FC, ReactNode } from 'react'

// interface
interface IProps {
  children: ReactNode
  className?: string
}

// component
const ContainerComponent: FC<IProps> = (props) => {
  const { children, className = '' } = props

  // return
  return <div className={`relative mx-auto w-full max-w-7xl px-4 pt-16 sm:px-6 lg:px-8 ${className}`}>{children}</div>
}

export default ContainerComponent
