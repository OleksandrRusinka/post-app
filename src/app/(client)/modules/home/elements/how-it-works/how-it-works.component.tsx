'use client'

import { useTranslations } from 'next-intl'
import { type FC } from 'react'

import { Card, CardBody } from '@heroui/card'

import { IHowItWorksCards } from './constants'

// interface
interface IProps {}

// component
const HowItWorksComponent: FC<Readonly<IProps>> = () => {
  const t = useTranslations()

  // return
  return (
    <div id='how-it-works' className='w-full pt-[60px] pb-6 md:pb-10'>
      <h3 className='text-dark text-center text-3xl font-semibold md:text-4xl'>{t('home_page_how_it_works_header')}</h3>

      <div className='flex w-full gap-3 pt-6 max-md:flex-col md:gap-6 md:pt-8'>
        {IHowItWorksCards(t).map((card) => (
          <Card key={`${card.title}-${card.id}`} shadow={'none'} className={'border-border-blue border-1'} fullWidth>
            
            <CardBody className={'gap-3 p-4 md:px-8 md:pt-[42px]'}>
              {card.icon && <div className='size-[38px]'>{card.icon}</div>}

              <p className={'text-start text-base text-[18px] font-semibold'}>{card.title}</p>

              <p className={'text-start text-sm'}>{card.description}</p>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default HowItWorksComponent
