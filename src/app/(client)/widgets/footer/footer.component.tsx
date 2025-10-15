'use client'

import Image from 'next/image'
import Link from 'next/link'
import { type FC } from 'react'

import { Divider } from '@heroui/divider'

import { socialsNetwork } from '@/shared/constants'

// interface
interface IProps {}

// component
const FooterComponent: FC<Readonly<IProps>> = () => {
  // return
  return (
    <footer className='z-10 mt-10 w-full overflow-hidden bg-[#001B36] py-8 lg:py-12'>
      <div className='mx-auto flex max-w-[100vw] flex-col gap-10 px-4 sm:px-6 lg:px-8'>
        <div className='mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 text-white md:grid-cols-2 lg:grid-cols-4'>
          <div className='flex flex-col items-start gap-4'>
            <Image src='/images/main-logo.svg' alt='logo' width={108} height={31} className='brightness-0 invert' />
            <ul className='flex gap-3'>
              {socialsNetwork.map((el, idx) => (
                <a
                  key={idx}
                  href={el.link}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={el.name}
                  className='group flex h-9 w-9 items-center justify-center brightness-0 invert'
                >
                  <Image
                    src={el.src}
                    alt={el.name}
                    width={22}
                    height={22}
                    className='opacity-80 transition-opacity duration-200 group-hover:opacity-100'
                  />
                </a>
              ))}
            </ul>
          </div>

          <div className='flex flex-col gap-3'>
            <p className='text-lg font-semibold'>Служба підтримки</p>

            <Link href='/' className='text-base font-medium'>
              Як скасувати підписку
            </Link>

            <Link
              href='/'
              className='mt-2 flex w-fit items-center justify-center gap-3 rounded-full border-2 border-white px-5 py-2 text-sm font-medium text-white transition hover:bg-white hover:text-[#001B36]'
            >
              <Image src='/images/huddle.svg' alt='huddle' width={24} height={24} className='brightness-0 invert' />
              <div className='flex flex-col items-start'>
                <span>Служба підтримки</span>
                <span className='font-semibold'>24/7/365</span>
              </div>
            </Link>
          </div>

          <div className='flex flex-col gap-2'>
            <p className='mb-2 text-lg font-semibold'>Юридичні</p>
            <Link href='/' className='text-base font-medium hover:underline'>
              Політика конфіденційності
            </Link>
            <Link href='/' className='text-base font-medium hover:underline'>
              Умови та положення
            </Link>
            <Link href='/' className='text-base font-medium hover:underline'>
              Політика щодо файлів cookie
            </Link>
            <Link href='/' className='text-base font-medium hover:underline'>
              Політика відшкодування
            </Link>
          </div>

          <div className='flex flex-col gap-2'>
            <p className='mb-2 text-lg font-semibold'>Про нас</p>
            <Link href='/' className='text-base font-medium hover:underline'>
              Довідковий центр
            </Link>
            <Link href='/' className='text-base font-medium hover:underline'>
              Блог
            </Link>
            <Link href='/' className='text-base font-medium hover:underline'>
              Відгуки
            </Link>
            <Link href='/' className='text-base font-medium hover:underline'>
              Ціни
            </Link>
          </div>
        </div>

        <div className='mx-auto w-full max-w-7xl'>
          <Divider className='bg-white/40' />
        </div>

        <div className='mx-auto flex w-full max-w-7xl flex-col-reverse items-center justify-between gap-6 text-white md:flex-row'>
          <p className='text-center text-sm md:text-left'>
            Авторське право © 2024-2025 myIQ™. Усі права захищено. Усі торгові марки, згадані тут, є власністю їхніх
            відповідних власників.
          </p>

          <div className='flex items-center gap-2'>
            <div className='flex h-8 w-[46px] items-center justify-center rounded-lg bg-white'>
              <Image src='/images/visa-card.svg' alt='visa-card' width={33} height={19} />
            </div>
            <div className='flex h-8 w-[46px] items-center justify-center rounded-lg bg-white'>
              <Image src='/images/master-card.svg' alt='master-card' width={31} height={19} />
            </div>
            <div className='flex h-8 w-[46px] items-center justify-center rounded-lg bg-white'>
              <Image src='/images/paypal.svg' alt='paypal' width={33} height={19} />
            </div>
            <div className='flex h-8 w-[46px] items-center justify-center rounded-lg bg-white'>
              <Image src='/images/apple-pay.svg' alt='apple-pay' width={33} height={19} />
            </div>
            <div className='flex h-8 w-[46px] items-center justify-center rounded-lg bg-white'>
              <Image src='/images/google-pay.svg' alt='google-pay' width={33} height={19} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default FooterComponent
