import { ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { type FC } from 'react'

import { IntroGraphIcon } from '@/shared/assets/icons/intro-result'

import { PeopleReviewsComponent } from '../people-reviews'

// interface
interface IProps {}

// component
const IntroResultComponent: FC<Readonly<IProps>> = () => {
  const t = useTranslations()

  // return
  return (
    <section id='skills' className={'relative z-0 flex h-full w-full flex-col overflow-hidden pt-14 lg:pt-[84px]'}>
      <div className={'flex h-full w-full flex-col-reverse items-center gap-5 lg:flex-row lg:justify-between'}>
        <div className={'flex w-full max-w-[630px] flex-col gap-3 lg:gap-4'}>

          <h1 className='text-[32px] font-extrabold lg:text-[48px]'>
            <span className='inline bg-gradient-to-r from-[#2C3345] to-[#424D6A] bg-clip-text text-transparent'>
              {t('home_page_want_to_know')}{' '}
            </span>

            <br className='max-lg:hidden' />

            <span className='bg-gradient-to-r from-[#27415F] via-[#007AFF] to-[#007AFF] bg-clip-text pr-2 whitespace-nowrap text-transparent'>
              {t('home_page_real_score')}
            </span>
          </h1>

          <p className={'text-base-dark text-[16px] sm:text-base lg:max-w-[325px] lg:text-[18px]'}>
            {t('home_page_take_your_score')}
          </p>

          <div className={'mt-2 flex gap-3 max-sm:flex-col max-sm:px-4 lg:flex-row lg:gap-6'}>
            <button className='bg-primary hover:bg-primary-hover flex w-full max-w-[280px] items-center justify-center rounded-xl px-6 py-3 font-medium text-white transition-colors max-sm:max-w-none sm:px-8 lg:w-auto'>
              <span>{t('home_page_iq_start_button')}</span>

              <ArrowRight size={16} className='ml-2' />
            </button>

            <button className='border-primary text-primary hover:bg-primary flex w-full max-w-[280px] items-center justify-center rounded-2xl border-2 px-6 py-3 font-medium transition-colors hover:text-white max-sm:max-w-none lg:w-auto'>
              {t('home_page_how_iq_works')}
            </button>
          </div>

          <PeopleReviewsComponent />
        </div>

        <div className='relative mx-auto flex aspect-[517/296] h-full w-full max-w-[517px] items-center justify-center max-lg:mt-[-28px]'>
          <IntroGraphIcon className='h-full w-full scale-[1.2]' />
        </div>

      </div>
    </section>
  )
}

export default IntroResultComponent
