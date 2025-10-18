'use client'

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

          <div className='justify-left flex grow-1 gap-1.5 [&_svg]:h-[25px] [&_svg]:w-[38px]'>
            {FOOTER_PAYMENT_METHODS.map((payment, index) => (
              <div key={index}>

                <div className={'flex size-[46px] h-8 items-center justify-center rounded-lg bg-white'}>
                  {payment.icon}

                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}

export default FooterBottomComponent
