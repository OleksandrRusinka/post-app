'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { type FC } from 'react'

import { PricingCardComponent } from '../pricing-card'
import { IPricingCardOffer } from '../pricing-card/constants'

// interfaces
interface IProps {}

// component
const PlanPricingComponent: FC<Readonly<IProps>> = () => {
  const t = useTranslations()

  // return
  return (
    <section className='relative py-6 md:py-10'>

      <div className='mx-auto w-full max-w-[740px]'>
        <h3 className='text-2.7xl order-4 text-center text-base font-semibold md:text-4xl'>
          {t('home_page_pricing_title')}
        </h3>

      </div>

      <p className='text-base-main text-center md:pt-0.5 md:text-[18px]'>{t('home_page_pricing_description')}</p>

      <div className='flex flex-wrap justify-center gap-6 pt-5 md:gap-8 md:pt-8'>
        {IPricingCardOffer.map((plan) => (
          <PricingCardComponent key={plan.id} plan={plan} />
        ))}
      </div>

      <p className={'text-base-main mt-4 text-center text-[15px]'}>
        Відвідайте нашу{' '}

        <Link href='/pricing' className='underline'>
          сторінку з цінами
        </Link>{' '}
        щоб дізнатися більше деталей.
      </p>

    </section>
  )
}

export default PlanPricingComponent
