import { FC, ReactNode } from 'react'

import { cn } from '@heroui/react'

// interface
interface IProps {
  children: ReactNode
  className?: string
  noPadding?: boolean
}

// component
const ContainerComponent: FC<IProps> = (props) => {
  const { children, className = '', noPadding = false } = props

  const paddingClasses = noPadding ? '' : 'px-4 sm:px-6 lg:px-8'

  return <div className={cn('relative mx-auto w-full overflow-x-hidden', paddingClasses, className)}>{children}</div>
}

export default ContainerComponent
