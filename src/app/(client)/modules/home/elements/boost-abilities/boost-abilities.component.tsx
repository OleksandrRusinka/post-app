'use client'

import { Check } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { type FC } from 'react'

import { Card, CardBody } from '@heroui/card'

import { useAbilitiesCards } from './constants'
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
        {useAbilitiesCards().map((card, index) => (
          <Card key={`${card.title}-${card.id}`} shadow={'none'} className={'border-1 border-[#E2E8F0]'} fullWidth>

            <CardBody className={'gap-3 p-4 md:py-6'}>

              <div className='size-[42px] rounded-full bg-[#007AFF] p-[3px]'>
                <div className='flex h-full w-full items-center justify-center rounded-full bg-white text-[20px] font-semibold text-[#2B2D42]'>
                  {index + 1}
                </div>
              </div>

              <p className={'text-start text-[18px] font-semibold text-[#2C3345]'}>{card.title}</p>

              <ul className='flex flex-col gap-2 max-md:pt-0.5'>
                {card.cases.map((item, idx) => (
                  <li key={idx} className={'flex items-start gap-1.5'}>

                    <div className='p-1'>
                      <Check className='h-3.5 w-4 min-w-4 text-[#007AFF]' />

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
