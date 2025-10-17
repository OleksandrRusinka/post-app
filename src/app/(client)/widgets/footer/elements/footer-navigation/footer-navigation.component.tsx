'use client'

import Link from 'next/link'
import { type FC } from 'react'

import { FOOTER_ABOUT_LINKS, FOOTER_LEGAL_LINKS, FOOTER_SECTIONS } from '../../constants'

// interface
interface IProps {}

// component
export const FooterNavigationComponent: FC<Readonly<IProps>> = () => {

  //return
  return (
    <ul className='mb-6 flex flex-col gap-4 max-sm:mt-4 sm:flex-row sm:gap-20 lg:mb-12'>
      <li>
        <p className='mb-4 text-lg font-semibold text-white'>{FOOTER_SECTIONS.legal.title}</p>

        <ul className='flex flex-col gap-2'>
          {FOOTER_LEGAL_LINKS.map((item, index) => (
            <li key={index}>
              <Link href='/' className='font-medium text-white transition-colors hover:text-gray-200'>
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </li>

      <li>
        <p className='mb-4 text-lg font-semibold text-white'>{FOOTER_SECTIONS.about.title}</p>

        <ul className='flex flex-col gap-2'>
          {FOOTER_ABOUT_LINKS.map((item, index) => (
            <li key={index}>
              <Link href='/' className='font-medium text-white transition-colors hover:text-gray-200'>
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </li>
    </ul>
  )
}

export default FooterNavigationComponent
