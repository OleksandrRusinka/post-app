'use client'

import Image from 'next/image'
import { type FC } from 'react'

import { LanguageSwitcherComponent } from '@/shared/ui/language-switcher'

import { FOOTER_PAYMENT_METHODS, FOOTER_SECTIONS } from '../../constants'

// interface
interface IProps {}

// component
export const FooterBottomComponent: FC<Readonly<IProps>> = () => {

  //return
  return (
    <div className='w-full pt-6'>
      <div className='flex flex-col gap-4 sm:items-end'>

        <div>
          <LanguageSwitcherComponent className='text-white' />
        </div>

        <div className='flex w-full flex-col justify-between gap-4 lg:flex-row lg:items-center'>
          <div>
            <p className='text-white'>{FOOTER_SECTIONS.copyright}</p>

          </div>

          <div className='flex grow-0 gap-1.5'>
            {FOOTER_PAYMENT_METHODS.map((payment) => (
              <div key={payment.alt} className='flex h-8 w-[46px] items-center justify-center rounded-lg bg-white'>

                <Image src={payment.src} alt={payment.alt} width={33} height={19} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FooterBottomComponent
