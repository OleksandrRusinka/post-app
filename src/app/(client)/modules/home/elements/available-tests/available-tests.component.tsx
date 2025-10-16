'use client'

import { ArrowRight, Check, Clock } from 'lucide-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { type FC } from 'react'

import { Button, Card, CardBody } from '@heroui/react'

import { availableTestsCards } from './constants'

// interface
interface IProps {}

// component
const AvailableTestsComponent: FC<Readonly<IProps>> = () => {
  const t = useTranslations()

  // return
  return (
    <div id='available-tests' className='relative z-0 py-6 md:py-8'>
      <h3 className='text-2.7xl text-dark text-center font-semibold md:text-4xl'>
        {t('home_page_available_tests_header')}
      </h3>

      <p className='pt-1.5 text-center text-base text-[#2C3345] md:pt-2.5 md:text-[18px]'>
        {t('home_page_available_tests_subtitle')}
      </p>

      <div className='grid grid-rows-4 gap-4 pt-6 max-lg:grid-cols-2 max-lg:grid-rows-2 max-md:grid-cols-1 md:gap-6 md:pt-8 lg:grid-cols-4 lg:grid-rows-1'>
        {availableTestsCards(t).map((card) => (
          <Card
            key={`${card.title}-${card.id}`}
            shadow={'none'}
            className={'border-1 border-[#E2E8F0] font-sans'}
            fullWidth
          >

            <CardBody className={'max-xs-l:items-start gap-2.5 px-4 py-6 max-md:items-center md:gap-3'}>
              {card.icon && <Image src={card.icon} alt={card.title} width={38} height={38} className='size-[38px]' />}

              <p className={'text-start text-[18px] font-semibold text-[#2C3345]'}>{card.title}</p>

              <div className='flex flex-wrap gap-x-4 gap-y-2 text-sm text-[#454F69]'>
                <div className='flex items-center gap-1.5'>

                  <Clock className='h-4 w-4' />
                  {' 30 хв'}
                </div>

                <div className='flex items-center gap-1.5'>
                  <Check className='h-4 w-4' />

                  {' 120 питань'}
                </div>
              </div>

              <Button className='mt-auto h-12 w-full rounded-xl bg-[#0D766E] px-6 text-sm whitespace-normal text-white sm:px-1 lg:max-w-[306px] xl:px-8 xl:text-base'>

                <span className='flex items-center justify-center gap-2'>
                  {card.buttonText}

                  <ArrowRight className='h-4 w-4' />
                </span>
              </Button>

            </CardBody>
          </Card>
        ))}
      </div>

      <div className={'absolute top-0 -left-1/2 z-[-1] h-full w-[200vw] bg-[#F6FBFF]'} />
    </div>
  )
}

export default AvailableTestsComponent
