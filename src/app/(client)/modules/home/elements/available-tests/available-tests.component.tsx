'use client'

import { ArrowRight, Check, Clock } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { type FC } from 'react'

import { Button, Card, CardBody, cn } from '@heroui/react'

import { IAvailableTests } from './constants'


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

      <p className='pt-1.5 text-center text-base md:pt-2.5 md:text-[18px]'>{t('home_page_available_tests_subtitle')}</p>

      <div className='grid grid-cols-1 gap-4 pt-6 sm:grid-cols-2 md:grid-cols-4 md:gap-6 md:pt-8'>
        {IAvailableTests(t).map((card) => (
          <Card
            key={`${card.title}-${card.id}`}
            shadow={'none'}
            className={'border-border-light border-1 font-sans'}
            fullWidth
          >

            <CardBody className={'items-start gap-2.5 px-4 py-6 max-md:items-center md:gap-3'}>

              <div className='size-[38px]'>{card.icon}</div>

              <p className={'text-start text-base text-[18px] font-semibold'}>{card.title}</p>

              <div className='text-gray flex flex-wrap gap-x-4 gap-y-2 text-sm'>

                <div className='flex items-center gap-1.5'>
                  <Clock className='h-4 w-4' />

                  {card.time}
                </div>

                <div className='flex items-center gap-1.5'>
                  <Check className='h-4 w-4' />

                  {card.questions}
                </div>
              </div>

              <Button
                disabled={card.button?.isDisabled}
                className={cn(
                  'mt-auto h-12 w-full rounded-xl px-6 text-sm whitespace-normal sm:px-1 lg:max-w-[306px] xl:px-8 xl:text-base',
                  card.button?.isDisabled
                    ? 'pointer-events-none cursor-not-allowed bg-[#7EB3AF] !text-white'
                    : 'bg-primary hover:bg-primary-hover !text-white',
                )}
              >

                <span className='flex items-center justify-center gap-2'>
                  {card.buttonText}

                  <ArrowRight className='h-4 w-4' />
                </span>
              </Button>

            </CardBody>
          </Card>
        ))}
      </div>

      <div className={'bg-background-light absolute top-0 -left-1/2 z-[-1] h-full w-[200vw]'} />

    </div>
  )
}

export default AvailableTestsComponent
