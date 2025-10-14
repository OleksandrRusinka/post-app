'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { type FC } from 'react' // видалили cloneElement

import { Card, CardBody } from '@heroui/card'

import { HowItWorksCardsConstant } from './constants/how-it-works.constant'

// interface
interface IProps {}

// component
const HowItWorksComponent: FC<Readonly<IProps>> = () => {
  const t = useTranslations()

  // return
  return (
    <div id='how-it-works' className='w-full pt-[60px] pb-6 md:pb-10'>
      <h3 className='text-dark-custom text-center text-3xl font-semibold md:text-4xl'>
        {t('home_page_how_it_works_header')}
      </h3>

      <div className='flex w-full gap-3 pt-6 max-md:flex-col md:gap-6 md:pt-8'>
        {HowItWorksCardsConstant(t).map((card) => (
          <Card key={`${card.title}-${card.id}`} shadow={'none'} className={'border-1 border-[#D9E7FF]'} fullWidth>
            <CardBody className={'gap-3 p-4 md:px-8 md:pt-[42px]'}>
              {card.icon && (
                <Image src={card.icon} alt={card.title} width={38} height={38} className='h-[38px] w-[38px]' />
              )}

              <p className={'text-start text-[18px] font-semibold text-[#2C3345]'}>{card.title}</p>

              <p className={'text-start text-sm'}>{card.description}</p>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default HowItWorksComponent
