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
    <section id='community'
      className={`relative z-0 flex flex-col items-center justify-between gap-6 px-4 py-8 md:flex-row md:gap-8 md:px-12 md:py-10`}
    >
      <div className='flex w-full flex-1 flex-col items-center text-center md:items-start md:text-left'>

        <h3 className='w-full text-[28px] leading-[42px] font-semibold text-[#2B2D42] md:text-[36px]'>
          {t('home_page_community_title')}
        </h3>

        <p className='mt-2 text-[17px] text-[#454F69] md:mt-3'>{t('home_page_community_subtitle')}</p>
      </div>

      <div className='flex flex-wrap justify-center gap-3 md:justify-end'>
        {socialsNetwork.map((el, id) => (
          <a
            key={id}
            href={el.link}
            target='_blank'
            rel='noopener noreferrer'
            aria-label={el.name}
            className='group flex h-12 w-24 items-center justify-center rounded-lg border border-[#007AFF] bg-white px-6 transition-all duration-300 hover:scale-105 hover:border-[#005FCC] hover:bg-[#F0F7FF]'
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

      <div className={'absolute top-0 -left-1/2 z-[-1] h-full w-[200vw] bg-[#F6FBFF]'} />
    </section>
  )
}

export default CommunityComponent
