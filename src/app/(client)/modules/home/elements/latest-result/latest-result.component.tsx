'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { type FC } from 'react'

import { ILatestResult } from './constants'

// interface
interface IProps {}

// component
const LatestResultsComponent: FC<Readonly<IProps>> = () => {
  const t = useTranslations()

  // return
  return (
    <section id='latest-results' className='mx-auto w-full max-w-6xl items-center pt-6 max-lg:pb-6 md:pt-[42px]'>
      <h3 className='text-center text-base text-[28px] font-semibold md:text-[39px]'>{t('home_page_latest_result')}</h3>

      <div className='pt-4 md:pt-6'>
        <div className='flex w-full flex-wrap gap-x-6 gap-y-4 text-left'>

          {ILatestResult.map((person) => (
            <div
              key={person.id}
              className={`flex basis-full items-center rounded-[18px] border border-transparent px-6 py-[18px] transition-colors lg:basis-[48%]`}
            >

              <div className='h-6 w-9 shrink-0 overflow-hidden rounded md:h-7 md:w-10 lg:h-8 lg:w-11'>
                <Image
                  src={person.img}
                  alt='person-country'
                  width={44}
                  height={32}
                  className='h-full w-full object-cover'
                />
              </div>

              <p className='ml-4 flex-1 text-base font-medium md:text-lg'>{person.name}</p>

              <div className='rounded-small text-blue-default ml-auto px-2 py-1 text-center font-semibold md:text-lg'>
                IQ {person.iqResult}
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default LatestResultsComponent
