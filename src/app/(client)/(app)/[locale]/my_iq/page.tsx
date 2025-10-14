import { setRequestLocale } from 'next-intl/server'
import { FC } from 'react'

// interface
interface IProps {
  params: Promise<{ locale: string }>
}

// component
const LayoutPage: FC<Readonly<IProps>> = async (props) => {
  const { locale } = await props.params

  setRequestLocale(locale)
  // return
  return <div>LayoutPage</div>
}

export default LayoutPage
