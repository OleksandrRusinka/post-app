'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { type FC } from 'react'

import { socialsNetwork } from '@/shared/constants'

// interface
interface IProps {}

// component
const CommunityComponent: FC<Readonly<IProps>> = () => {
  const t = useTranslations()

  // return
  return (
    <section
      id='community'
      className={`relative z-0 flex flex-col items-center justify-between gap-6 px-4 py-8 md:flex-row md:gap-8 md:px-12 md:py-10`}
    >
      <div className='flex w-full flex-1 flex-col items-center text-center md:items-start md:text-left'>
        <h3 className='text-base-dark w-full text-[28px] leading-[42px] font-semibold md:text-[36px]'>
          {t('home_page_community_title')}
        </h3>

        <p className='text-gray mt-2 text-[17px] md:mt-3'>{t('home_page_community_subtitle')}</p>
      </div>

      <div className='flex flex-wrap justify-center gap-3 md:justify-end'>
        {socialsNetwork.map((el, id) => (
          <a
            key={id}
            href={el.link}
            target='_blank'
            rel='noopener noreferrer'
            aria-label={el.name}
            className='group border-blue-primary hover:border-blue-hover hover:bg-blue-light flex h-12 w-24 items-center justify-center rounded-lg border bg-white px-6 transition-all duration-300 hover:scale-105'
          >

            <Image
              src={el.src}
              alt={el.name}
              width={24}
              height={24}
              className='opacity-80 transition-opacity duration-200 group-hover:opacity-100'
            />
          </a>
        ))}
      </div>

      <div className={'bg-background-light absolute top-0 -left-1/2 z-[-1] h-full w-[200vw]'} />
    </section>
  )
}

export default CommunityComponent
