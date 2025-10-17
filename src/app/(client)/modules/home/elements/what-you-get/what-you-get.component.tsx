'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { type FC } from 'react'

import { Card, CardBody, ScrollShadow } from '@heroui/react'

import { IWhatYouGet } from './constants'

// interface
interface IProps {}

// component
const WhatYouGetComponent: FC<Readonly<IProps>> = () => {
  const t = useTranslations()

  // return
  return (
    <div id='what-you-get' className='relative z-0 flex flex-col items-center gap-2 py-6 md:py-10'>
      <h4 className='text-base text-[28px] font-semibold md:text-[39px]'>{t('home_page_what_you_get_header')}</h4>

      <ScrollShadow
        size={20}
        orientation={'horizontal'}
        hideScrollBar
        className='overflow-x-auto pt-5 max-lg:w-[calc(100vw-48px)]'
      >
        <div className={'flex min-w-max gap-6'}>
          {IWhatYouGet(t).map((card) => (
            <Card key={card.id} className='border-border-blue w-[236px] rounded-lg border'>

              <CardBody className='!flex-row items-start gap-4 p-4 md:py-6'>
                <div className='p-1'>
                  <Image src='/icons/IconCheckmark.svg' alt='IconCheckmark' width={40} height={30} />

                </div>

                <p className='max-w-[80%] text-start text-base text-sm'>{card.text}</p>
              </CardBody>
            </Card>
          ))}
        </div>

      </ScrollShadow>

      <div className={'bg-background-light absolute top-0 -left-1/2 z-[-1] h-full w-[200vw]'} />
    </div>
  )
}

export default WhatYouGetComponent
