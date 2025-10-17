'use client'

import { useTranslations } from 'next-intl'
import { type FC } from 'react'

import { Card, CardBody } from '@heroui/card'

import { CheckIcon } from '@/shared/ui/check-icon'

import { IAbilities } from './constants'

// interface
interface IProps {}

// component
const BoostAbilitiesComponent: FC<Readonly<IProps>> = () => {
  const t = useTranslations()

  // return
  return (
    <div id='boost-abilities' className='py-6 md:py-10'>
      <h3 className='text-2.7xl text-dark text-center font-semibold md:text-4xl'>
        {t('home_page_boost_abilities_header')}
      </h3>

      <p className='text-center text-base md:pt-0.5 md:text-[18px]'>{t('home_page_boost_abilities_subtitle')}</p>

      <div className='flex gap-3 pt-5 max-lg:flex-col md:gap-6 md:pt-8'>
        {IAbilities(t).map((card, index) => (
          <Card key={`${card.title}-${card.id}`} shadow={'none'} className={'border-border-light border-1'} fullWidth>

            <CardBody className={'gap-3 p-4 md:py-6'}>
              <div className='bg-blue-primary size-[42px] rounded-full p-[3px]'>
                <div className='text-base-dark flex h-full w-full items-center justify-center rounded-full bg-white text-[20px] font-semibold'>
                  {index + 1}
                </div>
              </div>

              <p className={'text-start text-base text-[18px] font-semibold'}>{card.title}</p>

              <ul className='flex flex-col gap-2 max-md:pt-0.5'>
                {card.cases.map((item, idx) => (
                  <li key={idx} className={'flex items-start gap-1.5'}>

                    <div className='p-1'>
                      <CheckIcon width={16} className='text-blue-600' />
                    </div>

                    <p className='text-start text-sm'>{item.text}</p>
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default BoostAbilitiesComponent
