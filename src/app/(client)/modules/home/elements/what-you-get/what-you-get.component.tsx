'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { type FC } from 'react'

import { Card, CardBody, ScrollShadow } from '@heroui/react'

import { DiiffText } from './constants'

// interface
interface IProps {}

// component
const WhatYouGetComponent: FC<Readonly<IProps>> = () => {
  const t = useTranslations()

  // return
  return (
    <div id='what-you-get' className='relative z-0 flex flex-col items-center gap-2 py-6 md:py-10'>
      <h4 className='text-[28px] font-semibold text-[#2C3345] md:text-[39px]'>{t('home_page_what_you_get_header')}</h4>

      <ScrollShadow
        size={20}
        orientation={'horizontal'}
        hideScrollBar
        className='overflow-x-auto pt-5 max-lg:w-[calc(100vw-48px)]'
      >
        <div className={'flex min-w-max gap-6'}>
          {DiiffText(t).map((card) => (
            <Card key={card.id} className='w-[236px] rounded-lg border border-[#D9E7FF]'>

              <CardBody className='!flex-row items-start gap-4 p-4 md:py-6'>
                <div className='p-1'>
                  <Image
                    src='/images/IconCheckmark.svg'
                    alt='IconCheckmark'
                    width={22}
                    height={22}
                    className='size-[22px]'
                  />
                </div>

                <p className='max-w-[80%] text-start text-sm text-[#2C3345]'>{card.text}</p>
              </CardBody>
            </Card>
          ))}
        </div>
      </ScrollShadow>

      <div className={'absolute top-0 -left-1/2 z-[-1] h-full w-[200vw] bg-[#F6FBFF]'} />
    </div>
  )
}

export default WhatYouGetComponent
