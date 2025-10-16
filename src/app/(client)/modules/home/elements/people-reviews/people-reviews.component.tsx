import Image from 'next/image'
import React, { FC } from 'react'

// interface
interface IProps {}

// component
const PeopleReviewsComponent: FC<IProps> = () => {

  // return
  return (
    <div className='mt-[11px] flex items-center md:mt-4'>
      <div className='relative mr-6 flex md:mr-12'>

        <div className='relative h-10 w-10 overflow-hidden rounded-full border-3 border-white md:h-[50px] md:w-[50px] md:border-4'>
          <Image
            src={'/images/avatar1.png'}
            alt='people-reviews'
            fill
            className='object-cover'
            sizes='(max-width: 768px) 40px, 50px'
          />
        </div>

        <div className='relative -ml-5 h-10 w-10 overflow-hidden rounded-full border-3 border-white md:-ml-6 md:h-[50px] md:w-[50px] md:border-4'>
          <Image
            src={'/images/avatar1.png'}
            alt='people-reviews'
            fill
            className='object-cover'
            sizes='(max-width: 768px) 40px, 50px'
          />
        </div>

        <div className='relative -ml-5 h-10 w-10 overflow-hidden rounded-full border-3 border-white md:-ml-6 md:h-[50px] md:w-[50px] md:border-4'>
          <Image
            src={'/images/avatar3.png'}
            alt='people-reviews'
            fill
            className='object-cover'
            sizes='(max-width: 768px) 40px, 50px'
          />
        </div>

        <div className='relative -ml-5 h-10 w-10 overflow-hidden rounded-full border-3 border-white max-md:hidden md:-ml-6 md:h-[50px] md:w-[50px] md:border-4'>
          <Image
            src={'/images/avatar4.png'}
            alt='people-reviews'
            fill
            className='object-cover'
            sizes='(max-width: 768px) 40px, 50px'
          />
        </div>
      </div>

      <div className='-ml-4 flex flex-col text-sm text-[#2B2D42] md:-ml-8 md:text-base md:leading-6'>
        <div className='flex flex-wrap max-md:flex-col md:items-center md:gap-1'>

          <p>Відмінні відгуки користувачів</p>

          <div className='flex text-yellow-400 max-md:mt-1'>{'★'.repeat(5)}</div>
        </div>

        <p>
          <span className='font-semibold'>12024</span> IQ тестів пройдено сьогодні!
        </p>
      </div>
    </div>
  )
}

export default PeopleReviewsComponent
