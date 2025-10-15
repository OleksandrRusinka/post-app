'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { type FC } from 'react'

import { ResultCards } from './constants/result.constant'

// interface
interface IProps {}

// component
const LatestResultsComponent: FC<Readonly<IProps>> = () => {
  const t = useTranslations()

  const results = ResultCards()

  // return
  return (
    <section className='mx-auto w-full max-w-6xl items-center pt-6 max-lg:pb-6 md:pt-[42px]'>
      <h3 className='text-center text-[28px] font-semibold text-[#2C3345] md:text-[39px]'>
        {t('reviews_page_latest_result')}
      </h3>

      <div className='pt-4 md:pt-6'>
        <div className='flex w-full flex-wrap gap-x-6 gap-y-4 text-left'>
          {results.map((person, id) => (
            <div
              key={person.id}
              className={`flex basis-full items-center rounded-[18px] border border-transparent px-6 py-[18px] transition-colors lg:basis-[48%] ${
                (id > 1 && id < 4) || (id > 5 && id < 8) ? 'lg:bg-[#F6FBFF]' : 'lg:bg-white'
              } ${id === 1 || id === 3 ? 'max-lg:bg-[#F6FBFF]' : ''} ${id > 3 ? 'max-lg:hidden' : ''}`}
            >

              <div className='relative size-10 shrink-0 overflow-hidden rounded-full md:size-12'>

                <Image src={person.img} alt='person-country' fill className='object-cover' />
              </div>

              <p className='ml-4 flex-1 text-base font-medium text-[#2C3345] md:text-lg'>{person.name}</p>

              <div className='text-center font-semibold text-[#006FEE] md:text-lg'>IQ {person.iqResult}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default LatestResultsComponent
