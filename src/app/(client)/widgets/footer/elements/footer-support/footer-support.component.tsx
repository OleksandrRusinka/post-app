'use client'

import Link from 'next/link'
import { type FC } from 'react'

import { HuddleIcon } from '@/shared/assets/icons'

import { FOOTER_SECTIONS } from '../../constants'

// interface
interface IProps {}

// component
export const FooterSupportComponent: FC<Readonly<IProps>> = () => {

  //return
  return (
    <div className='max-sm:mt-6 sm:mr-10 lg:mr-20'>
      <p className='mb-4 text-lg font-semibold text-white'>{FOOTER_SECTIONS.support.title}</p>

      <Link href='/' className='block font-medium text-white hover:text-gray-200'>
        {FOOTER_SECTIONS.support.cancelSubscription}
      </Link>

      <Link
        href='/'
        className='group mt-3 flex max-w-[200px] items-center justify-center gap-3 rounded-full border-2 border-white px-4 py-2 text-sm font-medium text-white transition hover:bg-white hover:text-[#001B36]'
      >

        <div className='size-[24px] h-6 w-6 shrink-0 brightness-0 invert transition-all group-hover:brightness-100 group-hover:invert-0'>
          <HuddleIcon />
        </div>

        <p className='text-white group-hover:text-[#001B36]'>
          <span className='whitespace-nowrap'>{FOOTER_SECTIONS.support.support247}</span>

          <br />
          {FOOTER_SECTIONS.support.availability}
        </p>
      </Link>
    </div>
  )
}

export default FooterSupportComponent
