'use client'

import { type FC } from 'react'

import { Divider } from '@heroui/divider'

import {
  FooterBottomComponent,
  FooterLogoComponent,
  FooterNavigationComponent,
  FooterSupportComponent,
} from './elements'

// interface
interface IProps {}

// component
export const FooterComponent: FC<Readonly<IProps>> = () => {
  //return
  return (
    <footer className='z-10 mt-10 w-full overflow-hidden bg-[#001B36] py-6 text-white lg:py-12'>
      <div className='mx-auto flex w-full max-w-7xl flex-col max-[1320px]:px-6 max-sm:px-4'>
        <div className='flex flex-col justify-between sm:flex-row sm:gap-5'>
          <FooterLogoComponent />

          <div className='flex flex-col sm:flex-row sm:gap-5'>
            <FooterSupportComponent />

            <FooterNavigationComponent />
          </div>
        </div>

        <Divider className='bg-white/40' />

        <FooterBottomComponent />
      </div>
    </footer>
  )
}

export default FooterComponent
