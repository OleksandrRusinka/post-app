'use client'

import Image from 'next/image'
import Link from 'next/link'
import { type FC } from 'react'

import { Divider } from '@heroui/divider'

import { socialsNetwork } from '@/shared/constants'
import { LanguageSwitcherComponent } from '@/shared/ui/language-switcher'

// interface
interface IProps {}

// component
export const FooterComponent: FC<Readonly<IProps>> = () => {
  return (
    <footer className='z-10 mt-10 w-full overflow-hidden bg-[#001B36] py-8 lg:py-12'>
      <div className='mx-auto flex max-w-[100vw] flex-col gap-10 px-4 sm:px-6 lg:px-8'>

        <div className='mx-auto flex w-full flex-col justify-between md:flex-row md:gap-5'>
          <div className='flex flex-col justify-start gap-6'>
            <Image
              src='/images/main-logo.svg'
              alt='Website logo'
              width={108}
              height={31}
              className='brightness-0 invert'
            />

            <div className='flex gap-3'>
              {socialsNetwork.map((social) => (
                <a
                  key={social.name}
                  href={social.link}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={`Visit our ${social.name}`}
                  className='group flex h-9 w-9 items-center justify-center brightness-0 invert'
                >
                  <Image
                    src={social.src}
                    alt={social.name}
                    width={22}
                    height={22}
                    className='opacity-80 transition-opacity duration-200 group-hover:opacity-100'
                  />
                </a>
              ))}
            </div>
          </div>

          <div className='flex flex-col md:flex-row md:gap-5'>
            <div className='text-white max-md:mt-6 md:mr-10 lg:mr-20'>
              <h3 className='mb-4 text-lg font-semibold'>Служба підтримки</h3>

              <Link href='/' className='mb-3 block text-base font-medium'>
                Як скасувати підписку
              </Link>

              <Link
                href='/'
                className='mt-3 flex max-w-[200px] items-center justify-center gap-3 rounded-full border-2 border-white px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white hover:text-[#001B36]'
              >
                <Image
                  src='/images/huddle.svg'
                  alt='Support icon'
                  width={24}
                  height={24}
                  className='brightness-0 invert'
                />
                <div className='flex flex-col items-start text-left'>
                  <span className='leading-tight whitespace-nowrap'>Служба підтримки</span>
                  <span className='leading-tight font-semibold'>24/7/365</span>
                </div>
              </Link>
            </div>

            <div className='mb-6 flex flex-col gap-4 max-md:mt-4 md:flex-row md:gap-20 lg:mb-12'>

              <div className='flex flex-col gap-2'>
                <h3 className='mb-4 text-lg font-semibold text-white'>Юридичні</h3>
                {[
                  'Політика конфіденційності',
                  'Умови та положення',
                  'Політика щодо файлів cookie',
                  'Політика відшкодування',
                ].map((item) => (
                  <Link
                    key={item}
                    href='/'
                    className='text-base font-medium text-white transition-colors hover:underline'
                  >
                    {item}
                  </Link>
                ))}
              </div>

              <div className='flex flex-col gap-2'>
                <h3 className='mb-4 text-lg font-semibold text-white'>Про нас</h3>
                {['Довідковий центр', 'Блог', 'Відгуки', 'Ціни'].map((item) => (
                  <Link
                    key={item}
                    href='/'
                    className='text-base font-medium text-white transition-colors hover:underline'
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className='mx-auto w-full'>
          <Divider className='bg-white/40' />
        </div>

        <div className='mx-auto flex w-full flex-col-reverse items-center justify-between gap-6 text-white md:flex-row'>
          <p className='max-w-md text-center text-sm md:text-left'>
            Авторське право © 2024-2025 myIQ™. Усі права захищено. Усі торгові марки, згадані тут, є власністю їхніх
            відповідних власників.
          </p>

          <div className='flex flex-col items-center gap-4 md:items-end'>
            <div className='rounded-2xl border border-white px-2 py-1'>
              <LanguageSwitcherComponent />
            </div>

            <div className='flex items-center gap-2'>
              {[
                { src: '/images/payment-methods/visa-card.svg', alt: 'Visa card' },
                { src: '/images/payment-methods/master-card.svg', alt: 'Mastercard' },
                { src: '/images/payment-methods/paypal.svg', alt: 'PayPal' },
                { src: '/images/payment-methods/apple-pay.svg', alt: 'Apple Pay' },
                { src: '/images/payment-methods/google-pay.svg', alt: 'Google Pay' },
              ].map((payment) => (
                <div key={payment.alt} className='flex h-8 w-[46px] items-center justify-center rounded-lg bg-white'>

                  <Image src={payment.src} alt={payment.alt} width={33} height={19} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default FooterComponent
