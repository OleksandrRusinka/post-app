import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { type FC } from 'react'

import { PeopleReviewsComponent } from '../people-reviews'

// interface
interface IProps {}

// component
const IntroResultComponent: FC<Readonly<IProps>> = () => {
  const t = useTranslations()

// return
  return (
    <section id={'skills'} className={'relative z-0 flex h-full w-full flex-col overflow-hidden pt-14 lg:pt-[84px]'}>
      <div className={'flex h-full w-full flex-col-reverse items-center gap-5 lg:flex-row lg:justify-between'}>
        <div className={'flex w-full max-w-[630px] flex-col gap-3 lg:gap-4'}>
          <h1
            className={
              'text-[28px] leading-[36px] font-extrabold sm:text-[32px] sm:leading-[40px] lg:text-[48px] lg:leading-[62px]'
            }
          >
            <span className={'inline-block bg-gradient-to-r from-[#2C3345] to-[#424D6A] bg-clip-text text-transparent'}>
              {t('home_page_want_to_know')}
            </span>

            <br className={'max-lg:hidden'} />

            <span
              className={
                'inline-block bg-gradient-to-r from-[#27415F] via-[#007AFF] to-[#007AFF] bg-clip-text pr-2 text-transparent'
              }
            >
              {t('home_page_real_score')}
            </span>
          </h1>

          <p
            className={
              'text-sm leading-[22px] text-[#2B2D42] sm:text-base sm:leading-[25px] lg:max-w-[325px] lg:text-[18px]'
            }
          >
            {t('home_page_take_your_score')}
          </p>

          <div className={'mt-2 flex gap-3 max-sm:flex-col max-sm:px-4 lg:flex-row lg:gap-6'}>
            <button className='flex w-full max-w-[280px] items-center justify-center rounded-xl bg-[#0D766E] px-6 py-3 text-base font-medium whitespace-nowrap text-white transition-colors hover:bg-[#0b6a63] max-sm:max-w-none sm:px-8 lg:w-auto'>
              <span>{t('home_page_iq_start_button')}</span>

              <ArrowRight size={16} className='ml-2' />
            </button>

            <button className='flex w-full max-w-[280px] items-center justify-center rounded-2xl border-2 border-[#0D766E] px-6 py-3 text-base font-medium whitespace-nowrap text-[#0D766E] transition-colors hover:bg-[#0D766E] hover:text-white max-sm:max-w-none lg:w-auto'>
              <span>{t('home_page_how_iq_works')}</span>
            </button>
          </div>

          <PeopleReviewsComponent />
        </div>

        <div
          className={'relative mx-auto flex h-full w-full max-w-[517px] items-center justify-center max-lg:mt-[-28px]'}
        >
          <Image src={'/images/graph.svg'} alt='intro-result' width={517} height={296} />
        </div>
      </div>
    </section>
  )
}

export default IntroResultComponent
